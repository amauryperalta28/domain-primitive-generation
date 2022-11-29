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
        const isReadOnly = false;
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, `raw${className}`, 'decimal', isReadOnly);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRFQUF5RTtBQUV6RSw0QkFBNkI7QUFFaEIsUUFBQSxtQ0FBbUMsR0FBRyxDQUNqRCxVQUFzQixFQUN0QixRQUFpQyxFQUNqQyxVQUFrQixFQUNsQixTQUFpQixFQUNqQixFQUFFO0lBQ0YsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVoQyxNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLCtCQUErQixDQUFDO1FBQzNDLGNBQWMsRUFBRSxRQUFRO0tBQ3pCLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsRixZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBRXpELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qiw0RkFBNEY7WUFDNUYsOERBQThEO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLENBQ3BCLHNIQUFzSCxDQUN2SCxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLE9BQU87WUFDeEQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBLFNBQVM7WUFDMUQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFNBQVMsQ0FDcEIsc0hBQXNILENBQ3ZILENBQUM7UUFDRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFHekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXO1lBQ3pGLHNDQUFzQyxTQUFTLGVBQWU7U0FDL0QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBVXpCLFlBQVksQ0FBQyx5Q0FBeUMsQ0FDcEQ7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsRUFDRCxNQUFNLFNBQVMsRUFBRSxFQUNqQixTQUFTLEVBQ1QsVUFBVSxDQUNYLENBQUM7UUFFRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsc0JBQXNCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU1RCxZQUFZLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsY0FBYyxFQUFFLFFBQVE7WUFDeEIsYUFBYSxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDdkMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBRyxDQUM3QixZQUFnQyxFQUNoQyxTQUFpQixFQUNqQixVQUFrQixFQUNsQixFQUFFO0lBQ0YsWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLFNBQVMsZUFBZSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksQ0FBQyxTQUFTLENBQ3BCLHFDQUFxQyxTQUFTLG1DQUFtQyxTQUFTLG1DQUFtQyxVQUFVLE1BQU0sU0FBUyxLQUFLLENBQzVKLENBQUM7SUFDRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDM0IsQ0FBQyxDQUFDIn0=