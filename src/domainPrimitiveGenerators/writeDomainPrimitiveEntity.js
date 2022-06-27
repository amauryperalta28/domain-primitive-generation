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
        customWriter.writeClassBlock(classDefinitions, (c) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBRzVELFFBQUEsMEJBQTBCLEdBQUcsQ0FDdEMsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsVUFBcUMsRUFDdkMsRUFBRTtJQUVBLHNCQUFTLENBQUMsUUFBUSxDQUNkLEVBQUUsVUFBVSxFQUFFLFlBQVksU0FBUyxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQ3ZELENBQUMsTUFBa0IsRUFBRSxFQUFFO1FBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQsWUFBWSxDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGdCQUFnQixHQUFvQjtZQUN0QyxJQUFJLEVBQUUsU0FBUztZQUNmLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLGNBQWMsU0FBUyxVQUFVLENBQUM7U0FDckQsQ0FBQztRQUNGLFlBQVksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO2dCQUNyRCxZQUFZLENBQUMsaUJBQWlCLENBQUM7b0JBQzNCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtvQkFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUN2QixRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUUsSUFBSTtvQkFDZCxjQUFjLEVBQUUsUUFBUTtvQkFDeEIsYUFBYSxFQUFFLENBQUMsY0FBYyxTQUFTLE1BQU0sUUFBUSxDQUFDLElBQUks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