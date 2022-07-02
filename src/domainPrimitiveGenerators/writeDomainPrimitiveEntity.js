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
            xmlDocSummary: [`Represents ${className} entity.`],
        };
        customWriter.writePublicSealedClass(classDefinitions, (c) => {
            properties.forEach((property) => {
                customWriter.writeAutoProperty({
                    name: property.name,
                    typeName: property.isOptional ? `Option<${property.name}>` : property.name,
                    noGetter: false,
                    noSetter: true,
                    accessModifier: 'public',
                    xmlDocSummary: [`Represents ${className}'s ${property.name}`],
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
        xmlDocSummary: [`${className}'s builder.`],
    };
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');
        properties.forEach((property) => {
            customWriter.writeLine(`internal Option<${property.name}> ${property.name}Option { get; private set; }`);
            customWriter.writeLine();
        });
        customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
        customWriter.writeLine();
        writeDoBuild(className, customWriter, properties);
        properties.forEach((property) => {
            writeWithMethod(property.name, customWriter);
        });
    });
};
const writeWithMethod = (className, customWriter) => {
    const propertyName = className.toLowerCase();
    customWriter.writeLine(`public Builder With${className}(${className} ${_.camelCase(className)})`);
    customWriter.writeLine(`    => SetProperty(() => ${className}Option = Arguments.NotNull(${propertyName}, nameof(${_.camelCase(className)}).SomeNotNull()));`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRXpFLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUViLFFBQUEsMEJBQTBCLEdBQUcsQ0FDdEMsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsVUFBcUMsRUFDckMsZUFBdUIsRUFDekIsRUFBRTtJQUVBLHNCQUFTLENBQUMsUUFBUSxDQUNkLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUNqRSxDQUFDLE1BQWtCLEVBQUUsRUFBRTtRQUNuQixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNyRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGdCQUFnQixHQUFvQjtZQUN0QyxJQUFJLEVBQUUsU0FBUztZQUNmLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLGNBQWMsU0FBUyxVQUFVLENBQUM7U0FDckQsQ0FBQztRQUNGLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUNu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