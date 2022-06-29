"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveDecimalProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveDecimalProperty = (textWriter, property, entityName, namespace) => {
    const className = property.name;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDRFQUF5RTtBQUc1RCxRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFFBQWlDLEVBQ2pDLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWhDLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLENBQUMsK0JBQStCLENBQUM7UUFDM0MsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsaUJBQWlCLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQztLQUM5RCxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxZQUFZLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTNELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qiw0RkFBNEY7WUFDNUYsOERBQThEO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLENBQ3BCLHNIQUFzSCxDQUN2SCxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLE9BQU87WUFDeEQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBLFNBQVM7WUFDMUQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFNBQVMsQ0FDcEIsc0hBQXNILENBQ3ZILENBQUM7UUFDRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsZ0JBQWdCLGNBQWMsa0JBQWtCLGNBQWMsV0FBVztZQUN6RSxzQ0FBc0MsU0FBUyxlQUFlO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyx3Q0FBd0MsQ0FBQztZQUNwRCxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTVELFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztZQUM3QixJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsUUFBUTtZQUN4QixhQUFhLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztTQUN2QyxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLHNCQUFzQixHQUFHLENBQzdCLFlBQWdDLEVBQ2hDLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLEVBQUU7SUFDRixZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsU0FBUyxlQUFlLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDeEUsWUFBWSxDQUFDLFNBQVMsQ0FDcEIscUNBQXFDLFNBQVMsbUNBQW1DLFNBQVMsbUNBQW1DLFVBQVUsY0FBYyxDQUN0SixDQUFDO0lBQ0YsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzNCLENBQUMsQ0FBQyJ9