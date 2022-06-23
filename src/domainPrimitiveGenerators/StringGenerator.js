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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RyaW5nR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUFrRTtBQUNsRSw0RUFBeUU7QUFHNUQsUUFBQSxrQ0FBa0MsR0FBRyxDQUNoRCxVQUFzQixFQUN0QixTQUFpQixFQUNqQixVQUFrQixFQUNsQixVQUFrQixFQUNsQixFQUFFO0lBQ0YsTUFBTSxnQkFBZ0IsR0FBb0I7UUFDeEMsSUFBSSxFQUFFLFNBQVM7UUFDZixVQUFVLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztRQUN2QyxjQUFjLEVBQUUsUUFBUTtRQUN4QixhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDO0tBQzlELENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBRXRCLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixZQUFZLENBQUMsdUJBQXVCLENBQUMsaUJBQWlCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRW5CLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM3QyxNQUFNLGlCQUFpQixHQUEwQjtZQUMvQyxJQUFJLEVBQUUsY0FBYztZQUNwQixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFBRSxvQ0FBb0MsZ0JBQWdCLENBQUMsSUFBSSxJQUFJO1lBQzNFLGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUM7UUFFRixZQUFZLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsd0RBQXdEO1NBQ3pELENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsb0RBQW9EO1NBQ3JELENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFHM0MsTUFBTSxzQkFBc0IsR0FBMEI7WUFDbEQsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFlBQVksRUFBRSx3Q0FBd0M7WUFDdEQsY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQztRQUNKLFlBQVksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxnQkFBZ0IsQ0FBQyxJQUFJLE1BQU07WUFDbEUsZ0JBQWdCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVztZQUNuSCxzQ0FBc0MsZ0JBQWdCLENBQUMsSUFBSSxlQUFlO1NBQzNFLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQywyQkFBMkIsQ0FBQztZQUN2QyxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO1NBQ3RDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=