"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveIntegerProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveIntegerProperty = (textWriter, property, entityName, namespace) => {
    const className = property.name;
    const classDefinitions = {
        name: property.name,
        inherits: ['AbstractPositiveIntegerPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents ${entityName}'s ${className}`],
    };
    const emptyContentCallback = () => { };
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeUsingDirectives('Wepsys.Core');
    customWriter.writeLine();
    customWriter.writeCsharpTenNamespace(namespace);
    customWriter.writeLine();
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
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
            `<param name="raw${className}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
        }, `new PositiveInteger(raw${className})`, 'int');
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDRFQUF5RTtBQUc1RCxRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFFBQWlDLEVBQ2pDLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWhDLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixRQUFRLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztRQUM5QyxjQUFjLEVBQUUsUUFBUTtRQUN4QixhQUFhLEVBQUUsQ0FBQyxjQUFjLFVBQVUsTUFBTSxTQUFTLEVBQUUsQ0FBQztLQUMzRCxDQUFDO0lBRUYsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxZQUFZLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxVQUFVLEdBQTBCO1lBQ3hDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7U0FDbEQsQ0FBQztRQUVGLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDdEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFlBQVksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUTtTQUMvRCxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3RCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixJQUFJLEVBQUUsVUFBVTtZQUNoQixZQUFZLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLFVBQVU7U0FDaEUsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5QixxQ0FBcUMsU0FBUyxNQUFNO1lBQ3BELGlDQUFpQztTQUNsQyxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsZ0JBQWdCLENBQzNCLFFBQVEsRUFDUixTQUFTLEVBQ1QsVUFBVSxFQUNWLG9DQUFvQyxDQUNyQyxDQUFDO1FBQ0YsWUFBWSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0QsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHVDQUF1QyxTQUFTLE1BQU07WUFDdEQsbUJBQW1CLFNBQVMsa0JBQWtCLGNBQWMsV0FBVztZQUN2RSxzQ0FBc0MsU0FBUyxlQUFlO1NBQy9ELENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyx5Q0FBeUMsQ0FDcEQ7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLGNBQWMsRUFBRSxTQUFTO1NBQzFCLEVBQ0QsMEJBQTBCLFNBQVMsR0FBRyxFQUN0QyxLQUFLLENBQ04sQ0FBQztRQUVGLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9