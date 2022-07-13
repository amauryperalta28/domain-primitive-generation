"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveDecimalProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const _ = require("lodash");
exports.writeDomainPrimitiveDecimalProperty = (textWriter, property, entityName, namespace) => {
    const className = property.name;
    const classDefinitions = {
        name: className,
        inherits: ['ICoreDomainPrimitive<decimal>'],
        accessModifier: 'public',
    };
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}`);
    customWriter.writePublicSealedClass(classDefinitions, () => {
        customWriter.writeXmlDocSummary([
            'As primitive types are inlined by the compiler the coverlet tool does not catch a hit for ',
            'lines `private const decimal MinValue = 0.01M; and MaxValue.',
        ]);
        customWriter.writeLine("#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.");
        customWriter.writeField({
            accessModifier: 'private',
            name: 'MinValue',
            typeName: 'decimal',
            defaultValue: property.min ? `${property.min}M` : '0.01M',
            isStatic: true,
        });
        customWriter.writeLine();
        customWriter.writeField({
            accessModifier: 'private',
            name: 'MaxValue',
            typeName: 'decimal',
            defaultValue: property.max ? `${property.max}M` : '99_999M',
            isStatic: true,
        });
        customWriter.writeLine();
        customWriter.writeLine("#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.");
        customWriter.writeLine();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${_.camelCase(className)}">Represents a ${_.camelCase(className)}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithParameter({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, false);
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
    customWriter.writeLine(`  => Value = Arguments.Between(raw${className}, MinValue, MaxValue, nameof(raw${className}), "Invalid value or format for ${entityName}'s ${className}");`);
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRFQUF5RTtBQUV6RSw0QkFBNkI7QUFFaEIsUUFBQSxtQ0FBbUMsR0FBRyxDQUNqRCxVQUFzQixFQUN0QixRQUFpQyxFQUNqQyxVQUFrQixFQUNsQixTQUFpQixFQUNqQixFQUFFO0lBQ0YsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVoQyxNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLCtCQUErQixDQUFDO1FBQzNDLGNBQWMsRUFBRSxRQUFRO0tBQ3pCLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsRixZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBRXpELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qiw0RkFBNEY7WUFDNUYsOERBQThEO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLENBQ3BCLHNIQUFzSCxDQUN2SCxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLE9BQU87WUFDeEQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBLFNBQVM7WUFDMUQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFNBQVMsQ0FDcEIsc0hBQXNILENBQ3ZILENBQUM7UUFDRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFHekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXO1lBQ3pGLHNDQUFzQyxTQUFTLGVBQWU7U0FDL0QsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLHdDQUF3QyxDQUFDO1lBQ3BELElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsUUFBUSxFQUFFLElBQUk7U0FDZixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRVYsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLHNCQUFzQixDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFNUQsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQ3ZDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sc0JBQXNCLEdBQUcsQ0FDN0IsWUFBZ0MsRUFDaEMsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsRUFBRTtJQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxTQUFTLGVBQWUsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN4RSxZQUFZLENBQUMsU0FBUyxDQUNwQixxQ0FBcUMsU0FBUyxtQ0FBbUMsU0FBUyxtQ0FBbUMsVUFBVSxNQUFNLFNBQVMsS0FBSyxDQUM1SixDQUFDO0lBQ0YsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzNCLENBQUMsQ0FBQyJ9