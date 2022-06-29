"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveDateProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveDateProperty = (textWriter, className, entityName, namespace) => {
    const classDefinitions = {
        name: className,
        inherits: ['AbstractPastOrPresentTimestampPrimitive'],
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
            { typeName: 'PastOrPresentTimestamp', name: 'date' },
        ];
        customWriter.writeConstructor('private', className, parameters, 'base(date)');
        customWriter.writeCodeBlock(emptyContentCallback);
        customWriter.writeLine();
        const classNameLower = classDefinitions.name.toLowerCase();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
            isStatic: true
        }, `new PastOrPresentTimestamp(${classNameLower})`, 'DateTimeOffset');
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDRFQUF5RTtBQUU1RCxRQUFBLGdDQUFnQyxHQUFHLENBQzlDLFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1FBQ3JELGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRXRDLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sVUFBVSxHQUEwQjtZQUN4QyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1NBQ3JELENBQUM7UUFFRixZQUFZLENBQUMsZ0JBQWdCLENBQzNCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksQ0FDYixDQUFDO1FBQ0YsWUFBWSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0QsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsZ0JBQWdCLGNBQWMsa0JBQWtCLGNBQWMsV0FBVztZQUN6RSxzQ0FBc0MsU0FBUyxlQUFlO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyx5Q0FBeUMsQ0FDcEQ7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxTQUFTO1lBRXpCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsRUFDRCw4QkFBOEIsY0FBYyxHQUFHLEVBQy9DLGdCQUFnQixDQUNqQixDQUFDO1FBRUYsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=