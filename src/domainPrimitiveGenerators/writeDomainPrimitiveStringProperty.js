"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveStringProperty = (textWriter, className, entityName, namespace) => {
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEVBQXlFO0FBSzVELFFBQUEsa0NBQWtDLEdBQUcsQ0FDaEQsVUFBc0IsRUFDdEIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3JDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUNGLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0saUJBQWlCLEdBQTBCO1lBQy9DLElBQUksRUFBRSxjQUFjO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsWUFBWSxFQUFFLG9DQUFvQyxTQUFTLElBQUk7WUFDL0QsY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQztRQUVGLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyx3REFBd0Q7U0FDekQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsb0RBQW9EO1NBQ3JELENBQUMsQ0FBQztRQUVILE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUN0QixZQUFZLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sc0JBQXNCLEdBQTBCO1lBQ3BELElBQUksRUFBRSxtQkFBbUI7WUFDekIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsYUFBYTtZQUN2QixZQUFZLEVBQUUsd0NBQXdDO1lBQ3RELGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUM7UUFDRixZQUFZLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qix1Q0FBdUMsU0FBUyxNQUFNO1lBQ3RELGdCQUFnQixTQUFTLENBQUMsV0FBVyxFQUFFLGtCQUFrQixTQUFTLENBQUMsV0FBVyxFQUFFLFdBQVc7WUFDM0Ysc0NBQXNDLFNBQVMsZUFBZTtTQUMvRCxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsd0NBQXdDLENBQUM7WUFDcEQsSUFBSSxFQUFFLE1BQU07WUFDWixjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9