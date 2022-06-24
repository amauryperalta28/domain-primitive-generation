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
    const emptyContentCallback = () => { };
    const writer = new csharp_1.CSharpWriter(textWriter);
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    writer.writeLine();
    customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
    writer.writeLine();
    writer.writeClassBlock(classDefinitions, (c) => {
        const parameters = [
            { typeName: 'Guid', name: 'rawId' },
        ];
        customWriter.writePrivateConstructor(className, parameters, 'base(rawId)');
        customWriter.writeCodeBlock(emptyContentCallback);
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
        customWriter.writeLine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVHdWlkUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUd1aWRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FHMkI7QUFDM0IsNEVBQXlFO0FBRTVELFFBQUEsZ0NBQWdDLEdBQUcsQ0FDOUMsVUFBc0IsRUFDdEIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsVUFBVSxFQUFFLENBQUMsOEJBQThCLENBQUM7UUFDNUMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsaUJBQWlCLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQztLQUM5RCxDQUFDO0lBRUYsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRW5CLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxpQkFBaUIsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzdDLE1BQU0sVUFBVSxHQUEwQjtZQUN4QyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtTQUNwQyxDQUFDO1FBQ0YsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDM0UsWUFBWSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLGdCQUFnQixDQUFDLElBQUksTUFBTTtZQUNsRSxnQkFBZ0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXO1lBQ25ILHNDQUFzQyxnQkFBZ0IsQ0FBQyxJQUFJLGVBQWU7U0FDM0UsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLDJCQUEyQixDQUFDO1lBQ3ZDLElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLGdCQUFnQixDQUFDLElBQUk7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qix1Q0FBdUMsZ0JBQWdCLENBQUMsSUFBSSxNQUFNO1lBQ2xFLGdCQUFnQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGtCQUFrQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVc7WUFDbkgsc0NBQXNDLGdCQUFnQixDQUFDLElBQUksZUFBZTtTQUMzRSxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsNENBQTRDLENBQ3ZEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsY0FBYyxFQUFFLGdCQUFnQixDQUFDLElBQUk7U0FDdEMsRUFDRCxnQkFBZ0IsQ0FDakIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=