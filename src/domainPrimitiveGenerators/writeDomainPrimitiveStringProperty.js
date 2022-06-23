"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveStringProperty = void 0;
const csharp_1 = require("@yellicode/csharp");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveStringProperty = (textWriter, className, entityName, folderName) => {
    const classDefinitions = {
        name: className,
        implements: ['AbstractStringPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    const minLength = 1;
    const maxLength = 100;
    const writer = new csharp_1.CSharpWriter(textWriter);
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    writer.writeLine();
    customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
    writer.writeLine();
    writer.writeClassBlock(classDefinitions, (c) => {
        const errorMessageField = {
            name: 'ErrorMessage',
            isStatic: true,
            typeName: 'Message',
            defaultValue: `new("Invalid value or format for ${classDefinitions.name}")`,
            accessModifier: 'private',
        };
        customWriter.writeXmlDocParagraph([
            'Represents the Description minimum length restriction.',
        ]);
        customWriter.writePublicFieldConst('MinLength', 'int', minLength);
        customWriter.writeLine();
        customWriter.writeXmlDocParagraph([
            'Represents the Description max length restriction.',
        ]);
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
            `Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
            `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
            `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitialized({
            name: 'From',
            returnTypeName: classDefinitions.name,
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVTdHJpbmdQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRG9tYWluUHJpbWl0aXZlU3RyaW5nUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQWtFO0FBQ2xFLDRFQUF5RTtBQUc1RCxRQUFBLGtDQUFrQyxHQUFHLENBQ2hELFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3ZDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNwQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFFdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRW5CLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxpQkFBaUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzdDLE1BQU0saUJBQWlCLEdBQTBCO1lBQy9DLElBQUksRUFBRSxjQUFjO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsWUFBWSxFQUFFLG9DQUFvQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUk7WUFDM0UsY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQztRQUVGLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyx3REFBd0Q7U0FDekQsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyxvREFBb0Q7U0FDckQsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUczQyxNQUFNLHNCQUFzQixHQUEwQjtZQUNsRCxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsWUFBWSxFQUFFLHdDQUF3QztZQUN0RCxjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDO1FBQ0osWUFBWSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRWhELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLGdCQUFnQixDQUFDLElBQUksTUFBTTtZQUNsRSxnQkFBZ0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXO1lBQ25ILHNDQUFzQyxnQkFBZ0IsQ0FBQyxJQUFJLGVBQWU7U0FDM0UsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLDJCQUEyQixDQUFDO1lBQ3ZDLElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLGdCQUFnQixDQUFDLElBQUk7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==