"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const property_types_1 = require("../enums/property-types");
var _ = require('lodash');
exports.writeDomainPrimitiveEntity = (entity, outputDirectory) => {
    const className = entity.name;
    templating_1.Generator.generate({ outputFile: `${outputDirectory}/${className}/${className}.cs` }, (writer) => {
        const customWriter = new customCsharpWriter_1.CustomCsharpWriter(writer);
        customWriter.writeUsingDirectives('Optional', 'Triplex.Validations');
        customWriter.writeLine();
        customWriter.writeCsharpTenNamespace(entity.namespace);
        customWriter.writeLine();
        const classDefinitions = {
            name: className,
            accessModifier: 'public',
        };
        customWriter.writeOneLineXmlDocSummary(`Represents ${className} entity. `);
        customWriter.writePublicSealedClass(classDefinitions, () => {
            entity.properties.forEach((property) => {
                customWriter.writeOneLineXmlDocSummary(`Represents ${className}'s ${property.name}. `);
                customWriter.writeAutoProperty({
                    name: property.name,
                    typeName: property.isOptional ? `Option<${property.name}>` : property.name,
                    noGetter: false,
                    noSetter: true,
                    accessModifier: 'public',
                });
                customWriter.writeLine();
            });
            writeEntityConstructor(customWriter, className, entity.properties);
            customWriter.writeXmlDocParagraph(['TODO: Remember to write tests for businnes logic', 'TODO: and then if code coverage decreases comment or delete the code not used']);
            customWriter.writeLine();
            writeEntityBuilder(customWriter, className, entity.properties);
        });
    });
};
const writeEntityConstructor = (customWriter, className, properties) => {
    const parameters = [
        { typeName: 'Builder', name: 'builder' },
    ];
    customWriter.writeConstructor('private', className, parameters, null);
    customWriter.writeCodeBlock(() => {
        customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');
        properties.forEach((property) => {
            const propertyInitialization = property.isOptional ? `builder.${property.name}Option;` :
                `builder.${property.name}Option.ValueOrFailure();`;
            customWriter.writeLine(`${property.name} = ${propertyInitialization}`);
        });
    });
    customWriter.writeLine();
};
const writeEntityBuilder = (customWriter, className, properties) => {
    const classDefinitions = {
        name: 'Builder',
        accessModifier: 'public',
        inherits: [`AbstractEntityBuilder<${className}>`],
    };
    customWriter.writeOneLineXmlDocSummary(`${className}'s builder. `);
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');
        properties.forEach((property) => {
            customWriter.writeLine(`internal Option<${property.name}> ${property.name}Option { get; private set; }`);
            customWriter.writeLine();
        });
        customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
        customWriter.writeLine();
        const requiredProperties = properties.filter(property => !property.isOptional);
        writeDoBuild(className, customWriter, requiredProperties);
        properties.forEach((property) => {
            writeWithMethod(property, customWriter);
        });
    });
};
const writeWithMethod = (property, customWriter) => {
    const propertyName = property.name.toLowerCase();
    customWriter.writeLine(`public Builder With${property.name}(${property.name} ${_.camelCase(property.name)})`);
    if (property.type == property_types_1.PropertyType.enum) {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.ValidEnumerationMember(${propertyName}, nameof(${_.camelCase(property.name)}).SomeNotNull()));`);
    }
    else {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.NotNull(${propertyName}, nameof(${_.camelCase(property.name)}).SomeNotNull()));`);
    }
    customWriter.writeLine();
};
const writeWithMethodEnum = (property, customWriter) => {
    const propertyName = property.name.toLowerCase();
    customWriter.writeLine(`public Builder With${property.name}(${property.name} ${_.camelCase(property.name)})`);
    customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.ValidEnumerationMember(${propertyName}, nameof(${_.camelCase(property.name)}).SomeNotNull()));`);
    customWriter.writeLine();
};
const writeDoBuild = (className, customWriter, properties) => {
    customWriter.writeLine(`protected override ${className} DoBuild()`);
    customWriter.writeCodeBlock(() => {
        properties.forEach((property) => {
            customWriter.writeLine(`State.IsTrue(${property.name}Option.HasValue, "${className}'s ${property.name} is missing");`);
        });
        customWriter.writeLine();
        customWriter.writeLine(`return new ${className}(this);`);
    });
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRXpFLDREQUF1RDtBQUN2RCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFYixRQUFBLDBCQUEwQixHQUFHLENBQ3RDLE1BQWMsRUFDZCxlQUF1QixFQUN6QixFQUFFO0lBQ0EsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUU5QixzQkFBUyxDQUFDLFFBQVEsQ0FDZCxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLEVBQUUsRUFDakUsQ0FBQyxNQUFrQixFQUFFLEVBQUU7UUFDbkIsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDckUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLE1BQU0sZ0JBQWdCLEdBQW9CO1lBQ3RDLElBQUksRUFBRSxTQUFTO1lBQ2YsY0FBYyxFQUFFLFFBQVE7U0FDM0IsQ0FBQztRQUVGLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLFNBQVMsV0FBVyxDQUFDLENBQUM7UUFDM0UsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtZQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtnQkFDNUQsWUFBWSxDQUFD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