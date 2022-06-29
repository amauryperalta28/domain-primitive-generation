"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveEntity = (className, namespace, properties) => {
    templating_1.Generator.generate({ outputFile: `./result/${className}/${className}.cs` }, (writer) => {
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
        inherits: ['AbstractEntityBuilder<Domain>'],
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
    customWriter.writeLine(`public Builder With${className}(${className} ${propertyName})`);
    customWriter.writeLine(`    => SetProperty(() => ${className}Option = Arguments.NotNull(${propertyName}, nameof(${propertyName}).SomeNotNull()));`);
    customWriter.writeLine();
};
const writeDoBuild = (className, customWriter, properties) => {
    customWriter.writeLine(`protected override ${className} DoBuild()`);
    customWriter.writeCodeBlock(() => {
        properties.forEach((property) => {
            customWriter.writeLine(`State.IsTrue(${property.name.toLowerCase()}Option.HasValue, "${className}'s ${property.name} is missing");`);
        });
        customWriter.writeLine();
        customWriter.writeLine(`return new ${className}(this);`);
    });
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRzVELFFBQUEsMEJBQTBCLEdBQUcsQ0FDdEMsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsVUFBcUMsRUFDdkMsRUFBRTtJQUVBLHNCQUFTLENBQUMsUUFBUSxDQUNkLEVBQUUsVUFBVSxFQUFFLFlBQVksU0FBUyxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQ3ZELENBQUMsTUFBa0IsRUFBRSxFQUFFO1FBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLE1BQU0sZ0JBQWdCLEdBQW9CO1lBQ3RDLElBQUksRUFBRSxTQUFTO1lBQ2YsY0FBYyxFQUFFLFFBQVE7WUFDeEIsYUFBYSxFQUFFLENBQUMsY0FBYyxTQUFTLFVBQVUsQ0FBQztTQUNyRCxDQUFDO1FBQ0YsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtnQkFDckQsWUFBWSxDQUFDLGlCQUFpQixDQUFDO29CQUMzQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7b0JBQ25CLFFBQVEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxJQUFJLEdBQUcs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