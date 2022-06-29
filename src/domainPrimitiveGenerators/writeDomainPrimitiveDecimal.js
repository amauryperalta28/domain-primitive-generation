"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveDecimalProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveDecimalProperty = (textWriter, className, entityName, namespace) => {
    const classDefinitions = {
        name: className,
        inherits: ['ICoreDomainPrimitive<decimal>'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        const classNameLower = classDefinitions.name.toLowerCase();
        customWriter.writeXmlDocSummary([
            'As primitive types are inlined by the compiler the coverlet tool does not catch a hit for ',
            'lines `private const decimal MinValue = 0.01M; and MaxValue.',
        ]);
        customWriter.writeLine("#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.");
        customWriter.writeField({
            accessModifier: 'private',
            name: 'MinValue',
            typeName: 'decimal',
            defaultValue: '0.01M',
            isStatic: true,
        });
        customWriter.writeLine();
        customWriter.writeField({
            accessModifier: 'private',
            name: 'MaxValue',
            typeName: 'decimal',
            defaultValue: '99_999',
            isStatic: true,
        });
        customWriter.writeLine();
        customWriter.writeLine("#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.");
        customWriter.writeLine();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithParameter({
            name: 'From',
            returnTypeName: className,
        });
        customWriter.writeLine();
        writeConstructorMethod(customWriter, className, entityName);
        customWriter.writeAutoProperty({
            name: 'Value',
            typeName: 'decimal',
            noGetter: false,
            noSetter: true,
            accessModifier: 'public',
            xmlDocSummary: ['Gets property value'],
        });
        customWriter.writeLine();
    });
};
const writeConstructorMethod = (customWriter, className, entityName) => {
    customWriter.writeLine(`private ${className}(decimal raw${className})`);
    customWriter.writeLine(`  => Value = Arguments.Between(raw${className}, MinValue, MaxValue, nameof(raw${className}), "Invalid value or format for ${entityName}'s amount");`);
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDRFQUF5RTtBQUU1RCxRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLCtCQUErQixDQUFDO1FBQzNDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUzRCxZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsNEZBQTRGO1lBQzVGLDhEQUE4RDtTQUMvRCxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsU0FBUyxDQUNwQixzSEFBc0gsQ0FDdkgsQ0FBQztRQUNGLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDdEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsWUFBWSxFQUFFLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUTtZQUN0QixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsU0FBUyxDQUNwQixzSEFBc0gsQ0FDdkgsQ0FBQztRQUNGLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLFNBQVMsTUFBTTtZQUN0RCxnQkFBZ0IsY0FBYyxrQkFBa0IsY0FBYyxXQUFXO1lBQ3pFLHNDQUFzQyxTQUFTLGVBQWU7U0FDL0QsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLHdDQUF3QyxDQUFDO1lBQ3BELElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLHNCQUFzQixDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFNUQsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQ3ZDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sc0JBQXNCLEdBQUcsQ0FDN0IsWUFBZ0MsRUFDaEMsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsRUFBRTtJQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxTQUFTLGVBQWUsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN4RSxZQUFZLENBQUMsU0FBUyxDQUNwQixxQ0FBcUMsU0FBUyxtQ0FBbUMsU0FBUyxtQ0FBbUMsVUFBVSxjQUFjLENBQ3RKLENBQUM7SUFDRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDM0IsQ0FBQyxDQUFDIn0=