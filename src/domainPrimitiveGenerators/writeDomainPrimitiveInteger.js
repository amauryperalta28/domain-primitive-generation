"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveIntegerProperty = void 0;
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
exports.writeDomainPrimitiveIntegerProperty = (textWriter, className, entityName, namespace) => {
    const classDefinitions = {
        name: className,
        implements: ['AbstractPositiveIntegerPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    const emptyContentCallback = () => { };
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVJbnRlZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLDRFQUF5RTtBQUU1RCxRQUFBLG1DQUFtQyxHQUFHLENBQ2pELFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1FBQ2hELGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRXRDLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFekIsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxVQUFVLEdBQTBCO1lBQ3hDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7U0FDbEQsQ0FBQztRQUVGLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDdEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFlBQVksRUFBRSxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDdEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxVQUFVO1lBQ2hCLFlBQVksRUFBRSxVQUFVO1NBQ3pCLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixZQUFZLENBQUMsa0JBQWtCLENBQUM7WUFDOUIscUNBQXFDLFNBQVMsTUFBTTtZQUNwRCxpQ0FBaUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLGdCQUFnQixDQUMzQixRQUFRLEVBQ1IsU0FBUyxFQUNULFVBQVUsRUFDVixvQ0FBb0MsQ0FDckMsQ0FBQztRQUNGLFlBQVksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5Qix1Q0FBdUMsU0FBUyxNQUFNO1lBQ3RELGdCQUFnQixjQUFjLGtCQUFrQixjQUFjLFdBQVc7WUFDekUsc0NBQXNDLFNBQVMsZUFBZTtTQUMvRCxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMseUNBQXlDLENBQ3BEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixjQUFjLEVBQUUsU0FBUztTQUMxQixFQUNELHVCQUF1QixjQUFjLEdBQUcsRUFDeEMsS0FBSyxDQUNOLENBQUM7UUFFRixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==