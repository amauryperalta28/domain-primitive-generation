"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
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
    customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.NotNull(${propertyName}, nameof(${_.camelCase(property.name)}).SomeNotNull()));`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRXpFLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUViLFFBQUEsMEJBQTBCLEdBQUcsQ0FDdEMsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsVUFBcUMsRUFDckMsZUFBdUIsRUFDekIsRUFBRTtJQUVBLHNCQUFTLENBQUMsUUFBUSxDQUNkLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUNqRSxDQUFDLE1BQWtCLEVBQUUsRUFBRTtRQUNuQixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNyRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGdCQUFnQixHQUFvQjtZQUN0QyxJQUFJLEVBQUUsU0FBUztZQUNmLGNBQWMsRUFBRSxRQUFRO1NBQzNCLENBQUM7UUFFRixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxTQUFTLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7WUFDdkQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtnQkFDckQsWUFBWSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsU0FBUyxNQUFNLFFBQVEsQ0FBQyxJQUFJLElBQUks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