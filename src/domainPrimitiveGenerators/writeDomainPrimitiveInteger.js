"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveIntegerProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveIntegerProperty = (textWriter, className, entityName, namespace) => {
    const classDefinitions = {
        name: className,
        inherits: ['AbstractPositiveIntegerPrimitive'],
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
            { typeName: 'PositiveInteger', name: 'rawValue' },
        ];
        customWriter.writeField({
            accessModifier: 'private',
            isStatic: true,
            typeName: 'PositiveInteger',
            name: 'MinValue',
            defaultValue: 'new(1)',
        });
        customWriter.writeField({
            accessModifier: 'private',
            isStatic: true,
            typeName: 'PositiveInteger',
            name: 'MinValue',
            defaultValue: 'new(100)',
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
            `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);
        customWriter.writeShortMethodInitializedWithGivenValue({
            name: 'From',
            returnTypeName: className,
        }, `new PositiveInteger(${classNameLower})`, 'int');
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDRFQUF5RTtBQUU1RCxRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1FBQzlDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRXRDLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sVUFBVSxHQUEwQjtZQUN4QyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO1NBQ2xELENBQUM7UUFFRixZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3RCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixJQUFJLEVBQUUsVUFBVTtZQUNoQixZQUFZLEVBQUUsUUFBUTtTQUN2QixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3RCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixJQUFJLEVBQUUsVUFBVTtZQUNoQixZQUFZLEVBQUUsVUFBVTtTQUN6QixDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLHFDQUFxQyxTQUFTLE1BQU07WUFDcEQsaUNBQWlDO1NBQ2xDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxnQkFBZ0IsQ0FDM0IsUUFBUSxFQUNSLFNBQVMsRUFDVCxVQUFVLEVBQ1Ysb0NBQW9DLENBQ3JDLENBQUM7UUFDRixZQUFZLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzRCxZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsdUNBQXVDLFNBQVMsTUFBTTtZQUN0RCxnQkFBZ0IsY0FBYyxrQkFBa0IsY0FBYyxXQUFXO1lBQ3pFLHNDQUFzQyxTQUFTLGVBQWU7U0FDL0QsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLHlDQUF5QyxDQUNwRDtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLFNBQVM7U0FDMUIsRUFDRCx1QkFBdUIsY0FBYyxHQUFHLEVBQ3hDLEtBQUssQ0FDTixDQUFDO1FBRUYsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=