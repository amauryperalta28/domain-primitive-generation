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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEZWNpbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDRFQUF5RTtBQUU1RCxRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLCtCQUErQixDQUFDO1FBQzNDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTNELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qiw0RkFBNEY7WUFDNUYsOERBQThEO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLENBQ3BCLHNIQUFzSCxDQUN2SCxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsT0FBTztZQUNyQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3RCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFBRSxRQUFRO1lBQ3RCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxTQUFTLENBQ3BCLHNIQUFzSCxDQUN2SCxDQUFDO1FBQ0YsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qix1Q0FBdUMsU0FBUyxNQUFNO1lBQ3RELGdCQUFnQixjQUFjLGtCQUFrQixjQUFjLFdBQVc7WUFDekUsc0NBQXNDLFNBQVMsZUFBZTtTQUMvRCxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsd0NBQXdDLENBQUM7WUFDcEQsSUFBSSxFQUFFLE1BQU07WUFDWixjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsc0JBQXNCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU1RCxZQUFZLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsY0FBYyxFQUFFLFFBQVE7WUFDeEIsYUFBYSxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDdkMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBRyxDQUM3QixZQUFnQyxFQUNoQyxTQUFpQixFQUNqQixVQUFrQixFQUNsQixFQUFFO0lBQ0YsWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLFNBQVMsZUFBZSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLFlBQVksQ0FBQyxTQUFTLENBQ3BCLHFDQUFxQyxTQUFTLG1DQUFtQyxTQUFTLG1DQUFtQyxVQUFVLGNBQWMsQ0FDdEosQ0FBQztJQUNGLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUMzQixDQUFDLENBQUMifQ==