"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveEntity = (className, folderName, properties) => {
    templating_1.Generator.generate({ outputFile: `./result/${className}/${className}.cs` }, (writer) => {
        const customWriter = new customCsharpWriter_1.CustomCsharpWriter(writer);
        customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
        customWriter.writeLine();
        const classDefinitions = {
            name: className,
            accessModifier: 'public',
            xmlDocSummary: [`Represents ${className} entity.`],
        };
        customWriter.writeSealedClass(classDefinitions, (c) => {
            properties.forEach((property) => {
                customWriter.writeAutoProperty({
                    name: property.name,
                    typeName: property.name,
                    noGetter: false,
                    noSetter: true,
                    accessModifier: 'public',
                    xmlDocSummary: [`Represents ${className}'s ${property.name}`],
                });
                customWriter.writeLine();
            });
            writeEntityConstructor(customWriter, className, properties);
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
            customWriter.writeLine(`${property.name} = builder.${property.name}Option.ValueOrFailure();`);
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
    customWriter.writeClassBlock(classDefinitions, (c) => {
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
        customWriter.writeLine(`return new ${className}(this);`);
    });
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRzVELFFBQUEsMEJBQTBCLEdBQUcsQ0FDdEMsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsVUFBcUMsRUFDdkMsRUFBRTtJQUVBLHNCQUFTLENBQUMsUUFBUSxDQUNkLEVBQUUsVUFBVSxFQUFFLFlBQVksU0FBUyxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQ3ZELENBQUMsTUFBa0IsRUFBRSxFQUFFO1FBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQsWUFBWSxDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGdCQUFnQixHQUFvQjtZQUN0QyxJQUFJLEVBQUUsU0FBUztZQUNmLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLGNBQWMsU0FBUyxVQUFVLENBQUM7U0FDckQsQ0FBQztRQUNGLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUNuQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUk7b0JBQ3ZCLFFBQVEsRUFBRSxLQUFLO29CQUNmLFFBQVEsRUFBRSxJQUFJO29CQUNkLGNBQWMsRUFBRSxRQUFRO29CQUN4QixhQUFhLEVBQUUsQ0FBQyxjQUFjLFNBQVMsTUFBTSxRQUFRLENBQUMsSUFB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