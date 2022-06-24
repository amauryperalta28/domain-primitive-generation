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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVHdWlkUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUd1aWRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBa0U7QUFDbEUsNEVBQXlFO0FBRTVELFFBQUEsZ0NBQWdDLEdBQUcsQ0FDOUMsVUFBc0IsRUFDdEIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsVUFBVSxFQUFFLENBQUMsOEJBQThCLENBQUM7UUFDNUMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsaUJBQWlCLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQztLQUM5RCxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUV0QixNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixNQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFFN0MsWUFBWSxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLHdEQUF3RDtTQUN6RCxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLGdCQUFnQixDQUFDLElBQUksTUFBTTtZQUNsRSxnQkFBZ0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXO1lBQ25ILHNDQUFzQyxnQkFBZ0IsQ0FBQyxJQUFJLGVBQWU7U0FDM0UsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLDJCQUEyQixDQUFDO1lBQ3ZDLElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLGdCQUFnQixDQUFDLElBQUk7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxnQkFBZ0IsQ0FBQyxJQUFJLE1BQU07WUFDbEUsZ0JBQWdCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVztZQUNuSCxzQ0FBc0MsZ0JBQWdCLENBQUMsSUFBSSxlQUFlO1NBQzNFLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyw0Q0FBNEMsQ0FBQztZQUN4RCxJQUFJLEVBQUUsVUFBVTtZQUNoQixjQUFjLEVBQUUsZ0JBQWdCLENBQUMsSUFBSTtTQUN0QyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==