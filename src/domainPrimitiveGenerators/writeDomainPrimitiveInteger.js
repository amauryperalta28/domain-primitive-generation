"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveIntegerProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
var _ = require('lodash');
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
        const classNameLower = classDefinitions.name.toLowerCase();
        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="raw${className}">Represents a ${_.camelCase(className)}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
            accessModifier: 'public',
            isStatic: true
        }, `new PositiveInteger(raw${className})`, 'int', false);
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRFQUF5RTtBQUV6RSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFYixRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFFBQWlDLEVBQ2pDLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWhDLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixRQUFRLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztRQUM5QyxjQUFjLEVBQUUsUUFBUTtLQUN6QixDQUFDO0lBRUYsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxZQUFZLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDbEYsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUN6RCxNQUFNLFVBQVUsR0FBMEI7WUFDeEMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtTQUNsRCxDQUFDO1FBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixjQUFjLEVBQUUsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRO1NBQy9ELENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDdEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFlBQVksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUMsVUFBVTtTQUNoRSxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHFDQUFxQyxTQUFTLE1BQU07WUFDcEQsaUNBQWlDO1NBQ2xDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxnQkFBZ0IsQ0FDM0IsUUFBUSxFQUNSLFNBQVMsRUFDVCxVQUFVLEVBQ1Ysb0NBQW9DLENBQ3JDLENBQUM7UUFDRixZQUFZLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzRCxZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLFNBQVMsTUFBTTtZQUN0RCxtQkFBbUIsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVztZQUMvRSxzQ0FBc0MsU0FBUyxlQUFlO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyx5Q0FBeUMsQ0FDcEQ7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsRUFDRCwwQkFBMEIsU0FBUyxHQUFHLEVBQ3RDLEtBQUssRUFDTCxLQUFLLENBQ04sQ0FBQztRQUVGLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9