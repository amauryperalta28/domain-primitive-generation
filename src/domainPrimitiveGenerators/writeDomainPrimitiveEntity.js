"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveEntity = (textWriter, className, folderName, properties) => {
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
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
        const parameters = [
            { typeName: 'Builder', name: 'builder' },
        ];
        customWriter.writePrivateConstructor(className, parameters, null);
        customWriter.writeCodeBlock(() => {
            customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');
            properties.forEach((property) => {
                customWriter.writeLine(`${property.name} = builder.${property.name}Option.ValueOrFailure();`);
            });
        });
        customWriter.writeLine();
        writeEntityBuilder(className, customWriter, properties);
    });
};
const writeEntityBuilder = (className, customWriter, properties) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw0RUFBeUU7QUFHNUQsUUFBQSwwQkFBMEIsR0FBRyxDQUN0QyxVQUFzQixFQUN0QixTQUFpQixFQUNqQixVQUFrQixFQUNsQixVQUFxQyxFQUNyQyxFQUFFO0lBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxZQUFZLENBQUMsdUJBQXVCLENBQUMsaUJBQWlCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsY0FBYyxTQUFTLFVBQVUsQ0FBQztLQUNuRCxDQUFDO0lBQ0YsWUFBWSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25ELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QixZQUFZLENBQUMsaUJBQWlCLENBQUM7Z0JBQzdCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUN2QixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxjQUFjLEVBQUUsUUFBUTtnQkFDeEIsYUFBYSxFQUFFLENBQUMsY0FBYyxTQUFTLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzlELENBQUMsQ0FBQztZQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUEwQjtZQUN4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