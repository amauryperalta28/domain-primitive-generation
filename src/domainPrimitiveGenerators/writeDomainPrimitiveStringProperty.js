"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveStringProperty = (textWriter, className, entityName, namespace) => {
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    const classDefinitions = {
        name: className,
        inherits: ['AbstractStringPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        const errorMessageField = {
            name: 'ErrorMessage',
            isStatic: true,
            typeName: 'Message',
            defaultValue: `new("Invalid value or format for ${className}")`,
            accessModifier: 'private',
        };
        customWriter.writeXmlDocParagraph([
            'Represents the Description minimum length restriction.',
        ]);
        const minLength = 1;
        customWriter.writePublicFieldConst('MinLength', 'int', minLength);
        customWriter.writeLine();
        customWriter.writeXmlDocParagraph([
            'Represents the Description max length restriction.',
        ]);
        const maxLength = 100;
        customWriter.writePublicFieldConst('MaxLength', 'int', maxLength);
        customWriter.writeLine();
        customWriter.writeField(errorMessageField);
        const StringLengthRangeField = {
            name: 'StringLengthRange',
            isStatic: true,
            typeName: 'LengthRange',
            defaultValue: `(MinLength, MaxLength).ToLengthRange()`,
            accessModifier: 'private',
        };
        customWriter.writeField(StringLengthRangeField);
        customWriter.writeLine();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${className.toLowerCase()}">Represents a ${className.toLowerCase()}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithParameter({
            name: 'From',
            returnTypeName: className,
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEVBQXlFO0FBSzVELFFBQUEsa0NBQWtDLEdBQUcsQ0FDaEQsVUFBc0IsRUFDdEIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLENBQUMseUJBQXlCLENBQUM7UUFDckMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsaUJBQWlCLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQztLQUM5RCxDQUFDO0lBQ0YsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxpQkFBaUIsR0FBMEI7WUFDL0MsSUFBSSxFQUFFLGNBQWM7WUFDcEIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsb0NBQW9DLFNBQVMsSUFBSTtZQUMvRCxjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDO1FBRUYsWUFBWSxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLHdEQUF3RDtTQUN6RCxDQUFDLENBQUM7UUFDSCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDcEIsWUFBWSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyxvREFBb0Q7U0FDckQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFM0MsTUFBTSxzQkFBc0IsR0FBMEI7WUFDcEQsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFlBQVksRUFBRSx3Q0FBd0M7WUFDdEQsY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQztRQUNGLFlBQVksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsZ0JBQWdCLFNBQVMsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLFNBQVMsQ0FBQyxXQUFXLEVBQUUsV0FBVztZQUMzRixzQ0FBc0MsU0FBUyxlQUFlO1NBQy9ELENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyx3Q0FBd0MsQ0FBQztZQUNwRCxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=