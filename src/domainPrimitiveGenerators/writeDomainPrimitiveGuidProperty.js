"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveGuidProperty = void 0;
const csharp_1 = require("@yellicode/csharp");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveGuidProperty = (textWriter, className, entityName, folderName) => {
    const classDefinitions = {
        name: className,
        implements: ['AbstractGuidBasedIdPrimitive'],
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
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
            `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
            `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithoutParameters({
            name: 'Generate',
            returnTypeName: classDefinitions.name,
        }, 'Guid.NewGuid()');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVHdWlkUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUd1aWRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBa0U7QUFDbEUsNEVBQXlFO0FBRTVELFFBQUEsZ0NBQWdDLEdBQUcsQ0FDOUMsVUFBc0IsRUFDdEIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsVUFBVSxFQUFFLENBQUMsOEJBQThCLENBQUM7UUFDNUMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsaUJBQWlCLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQztLQUM5RCxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUV0QixNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixNQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFFN0MsWUFBWSxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLHdEQUF3RDtTQUN6RCxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLG9EQUFvRDtTQUNyRCxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qix1Q0FBdUMsZ0JBQWdCLENBQUMsSUFBSSxNQUFNO1lBQ2xFLGdCQUFnQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGtCQUFrQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVc7WUFDbkgsc0NBQXNDLGdCQUFnQixDQUFDLElBQUksZUFBZTtTQUMzRSxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsMkJBQTJCLENBQUM7WUFDdkMsSUFBSSxFQUFFLE1BQU07WUFDWixjQUFjLEVBQUUsZ0JBQWdCLENBQUMsSUFBSTtTQUN0QyxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLGdCQUFnQixDQUFDLElBQUksTUFBTTtZQUNsRSxnQkFBZ0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXO1lBQ25ILHNDQUFzQyxnQkFBZ0IsQ0FBQyxJQUFJLGVBQWU7U0FDM0UsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLDRDQUE0QyxDQUFDO1lBQ3hELElBQUksRUFBRSxVQUFVO1lBQ2hCLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO1NBQ3RDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9