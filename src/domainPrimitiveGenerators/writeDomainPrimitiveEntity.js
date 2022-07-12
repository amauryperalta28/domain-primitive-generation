"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const property_types_1 = require("../enums/property-types");
var _ = require('lodash');
exports.writeDomainPrimitiveEntity = (className, namespace, properties, outputDirectory) => {
    templating_1.Generator.generate({ outputFile: `${outputDirectory}/${className}/${className}.cs` }, (writer) => {
        const customWriter = new customCsharpWriter_1.CustomCsharpWriter(writer);
        customWriter.writeUsingDirectives('Optional', 'Triplex.Validations');
        customWriter.writeLine();
        customWriter.writeCsharpTenNamespace(namespace);
        customWriter.writeLine();
        const classDefinitions = {
            name: className,
            accessModifier: 'public',
        };
        customWriter.writeOneLineXmlDocSummary(`Represents ${className} entity. `);
        customWriter.writePublicSealedClass(classDefinitions, () => {
            properties.forEach((property) => {
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
            writeEntityConstructor(customWriter, className, properties);
            customWriter.writeXmlDocParagraph(['TODO: Remember to write tests for businnes logic', 'TODO: and then if code coverage decreases comment or delete the code not used']);
            customWriter.writeLine();
            writeEntityBuilder(customWriter, className, properties);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRXpFLDREQUF1RDtBQUN2RCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFYixRQUFBLDBCQUEwQixHQUFHLENBQ3RDLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLFVBQXFDLEVBQ3JDLGVBQXVCLEVBQ3pCLEVBQUU7SUFFQSxzQkFBUyxDQUFDLFFBQVEsQ0FDZCxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLEVBQUUsRUFDakUsQ0FBQyxNQUFrQixFQUFFLEVBQUU7UUFDbkIsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDckUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsTUFBTSxnQkFBZ0IsR0FBb0I7WUFDdEMsSUFBSSxFQUFFLFNBQVM7WUFDZixjQUFjLEVBQUUsUUFBUTtTQUMzQixDQUFDO1FBRUYsWUFBWSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsU0FBUyxXQUFXLENBQUMsQ0FBQztRQUMzRSxZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1lBQ3ZELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLFNBQVMsTUFBTSxRQUFRLENB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