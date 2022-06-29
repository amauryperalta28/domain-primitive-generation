"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveGuidProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveGuidProperty = (textWriter, className, entityName, namespace) => {
    const classDefinitions = {
        name: className,
        inherits: ['AbstractGuidBasedIdPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    const emptyContentCallback = () => { };
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        const parameters = [
            { typeName: 'Guid', name: 'rawId' },
        ];
        const classNameLower = classDefinitions.name.toLowerCase();
        customWriter.writeConstructor('private', className, parameters, 'base(rawId)');
        customWriter.writeCodeBlock(emptyContentCallback);
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
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithoutParameters({
            name: 'Generate',
            returnTypeName: className,
        }, 'Guid.NewGuid()');
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVHdWlkUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUd1aWRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSw0RUFBeUU7QUFFNUQsUUFBQSxnQ0FBZ0MsR0FBRyxDQUM5QyxVQUFzQixFQUN0QixTQUFpQixFQUNqQixVQUFrQixFQUNsQixTQUFpQixFQUNqQixFQUFFO0lBQ0YsTUFBTSxnQkFBZ0IsR0FBb0I7UUFDeEMsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztRQUMxQyxjQUFjLEVBQUUsUUFBUTtRQUN4QixhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDO0tBQzlELENBQUM7SUFFRixNQUFNLG9CQUFvQixHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUN0QyxNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMxRCxNQUFNLFVBQVUsR0FBMEI7WUFDeEMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7U0FDcEMsQ0FBQztRQUVGLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUzRCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDL0UsWUFBWSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLFNBQVMsTUFBTTtZQUN0RCxnQkFBZ0IsY0FBYyxrQkFBa0IsY0FBYyxXQUFXO1lBQ3pFLHNDQUFzQyxTQUFTLGVBQWU7U0FDL0QsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLHdDQUF3QyxDQUFDO1lBQ3BELElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qix1Q0FBdUMsU0FBUyxNQUFNO1lBQ3RELGdCQUFnQixjQUFjLGtCQUFrQixjQUFjLFdBQVc7WUFDekUsc0NBQXNDLFNBQVMsZUFBZTtTQUMvRCxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsNENBQTRDLENBQ3ZEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsY0FBYyxFQUFFLFNBQVM7U0FDMUIsRUFDRCxnQkFBZ0IsQ0FDakIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=