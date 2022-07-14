"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveIntegerProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const _ = require("lodash");
exports.writeDomainPrimitiveIntegerProperty = (textWriter, property, entityName, namespace) => {
    const className = property.name;
    const classDefinitions = {
        name: property.name,
        inherits: ['AbstractPositiveIntegerPrimitive'],
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
            { typeName: 'PositiveInteger', name: 'rawValue' },
        ];
        customWriter.writeField({
            accessModifier: 'private',
            isStatic: true,
            typeName: 'PositiveInteger',
            name: 'MinValue',
            defaultValue: property.min ? `new(${property.min})` : 'new(1)',
        });
        customWriter.writeField({
            accessModifier: 'private',
            isStatic: true,
            typeName: 'PositiveInteger',
            name: 'MinValue',
            defaultValue: property.max ? `new(${property.max})` : 'new(100)',
        });
        customWriter.writeLine();
        customWriter.writeXmlDocSummary([
            `Creates an instance of <see cref="${className}"/>.`,
            `<param name="rawValue"></param>`,
        ]);
        customWriter.writeConstructor('public', className, parameters, 'base(rawValue, MinValue, MaxValue)');
        customWriter.writeCodeBlock(emptyContentCallback);
        customWriter.writeLine();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="raw${className}">Represents a ${_.camelCase(className)}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        const isReadOnly = false;
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, `new PositiveInteger(raw${className})`, 'int', isReadOnly);
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRFQUF5RTtBQUV6RSw0QkFBNkI7QUFFaEIsUUFBQSxtQ0FBbUMsR0FBRyxDQUNqRCxVQUFzQixFQUN0QixRQUFpQyxFQUNqQyxVQUFrQixFQUNsQixTQUFpQixFQUNqQixFQUFFO0lBQ0YsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVoQyxNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFDbkIsUUFBUSxFQUFFLENBQUMsa0NBQWtDLENBQUM7UUFDOUMsY0FBYyxFQUFFLFFBQVE7S0FDekIsQ0FBQztJQUVGLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFLEdBQTRDLENBQUMsQ0FBQztJQUVoRixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsRixZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQ3pELE1BQU0sVUFBVSxHQUEwQjtZQUN4QyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO1NBQ2xELENBQUM7UUFFRixZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3RCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixJQUFJLEVBQUUsVUFBVTtZQUNoQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVE7U0FDL0QsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFBLENBQUMsQ0FBQyxVQUFVO1NBQ2hFLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIscUNBQXFDLFNBQVMsTUFBTTtZQUNwRCxpQ0FBaUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLGdCQUFnQixDQUMzQixRQUFRLEVBQ1IsU0FBUyxFQUNULFVBQVUsRUFDVixvQ0FBb0MsQ0FDckMsQ0FBQztRQUNGLFlBQVksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsbUJBQW1CLFNBQVMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVc7WUFDL0Usc0NBQXNDLFNBQVMsZUFBZTtTQUMvRCxDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekIsWUFBWSxDQUFDLHlDQUF5QyxDQUNwRDtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsUUFBUSxFQUFFLElBQUk7U0FDZixFQUNELDBCQUEwQixTQUFTLEdBQUcsRUFDdEMsS0FBSyxFQUNMLFVBQVUsQ0FDWCxDQUFDO1FBRUYsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=