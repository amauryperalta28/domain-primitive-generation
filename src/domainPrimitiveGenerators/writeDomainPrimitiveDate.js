"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveDateProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveDateProperty = (textWriter, property, entityName, namespace) => {
    const className = property.name;
    const classDefinitions = {
        name: className,
        inherits: ['AbstractPastOrPresentTimestampPrimitive'],
        accessModifier: 'public',
    };
    const emptyContentCallback = () => { };
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}`);
    customWriter.writePublicSealedClass(classDefinitions, () => {
        const parameters = [
            { typeName: 'PastOrPresentTimestamp', name: 'date' },
        ];
        customWriter.writeConstructor('private', className, parameters, 'base(date)');
        customWriter.writeCodeBlock(emptyContentCallback);
        customWriter.writeLine();
        const classNameLower = classDefinitions.name.toLowerCase();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="raw${className}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        const isReadOnly = false;
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, `new PastOrPresentTimestamp(raw${className})`, 'DateTimeOffset', isReadOnly);
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVEYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVEYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRFQUF5RTtBQUc1RCxRQUFBLGdDQUFnQyxHQUFHLENBQzlDLFVBQXNCLEVBQ3RCLFFBQWlDLEVBQ2pDLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWhDLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsUUFBUSxFQUFFLENBQUMseUNBQXlDLENBQUM7UUFDckQsY0FBYyxFQUFFLFFBQVE7S0FDekIsQ0FBQztJQUVGLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFLEdBQTZDLENBQUMsQ0FBQztJQUVqRixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsRixZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQ3pELE1BQU0sVUFBVSxHQUEwQjtZQUN4QyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1NBQ3JELENBQUM7UUFFRixZQUFZLENBQUMsZ0JBQWdCLENBQzNCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksQ0FDYixDQUFDO1FBQ0YsWUFBWSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0QsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsbUJBQW1CLFNBQVMsa0JBQWtCLGNBQWMsV0FBVztZQUN2RSxzQ0FBc0MsU0FBUyxlQUFlO1NBQy9ELENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV6QixZQUFZLENBQUMseUNBQXlDLENBQ3BEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixjQUFjLEVBQUUsU0FBUztZQUN6QixjQUFjLEVBQUUsUUFBUTtZQUN4QixRQUFRLEVBQUUsSUFBSTtTQUNmLEVBQ0QsaUNBQWlDLFNBQVMsR0FBRyxFQUM3QyxnQkFBZ0IsRUFDaEIsVUFBVSxDQUNYLENBQUM7UUFFRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==