"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const propertyTypeGenerators_1 = require("../helpers/propertyTypeGenerators");
const writeDomainPrimitiveEntityBuilder_1 = require("./writeDomainPrimitiveEntityBuilder");
exports.writeDomainPrimitiveEntity = (entity, outputDirectory) => {
    const className = entity.name;
    templating_1.Generator.generate({ outputFile: `${outputDirectory}/${className}/${className}.cs` }, (writer) => {
        const customWriter = new customCsharpWriter_1.CustomCsharpWriter(writer);
        customWriter.writeUsingDirectives('Optional', 'Triplex.Validations');
        customWriter.writeLine();
        customWriter.writeCsharpTenNamespace(entity.namespace);
        customWriter.writeLine();
        const classDefinitions = {
            name: className,
            accessModifier: 'public',
        };
        customWriter.writeOneLineXmlDocSummary(`Represents ${className} entity. `);
        customWriter.writePublicSealedClass(classDefinitions, () => {
            entity.properties.forEach((property) => {
                customWriter.writeOneLineXmlDocSummary(`Represents ${className}'s ${property.name}. `);
                customWriter.writeAutoProperty({
                    name: property.name,
                    typeName: getPropertyTypeName(property),
                    noGetter: false,
                    noSetter: true,
                    accessModifier: 'public',
                });
                customWriter.writeLine();
            });
            writeEntityConstructor(customWriter, className, entity.properties);
            customWriter.writeXmlDocParagraph(['TODO: Remember to write tests for business logic', 'TODO: and then if code coverage decreases comment or delete the code not used']);
            customWriter.writeLine();
            writeDomainPrimitiveEntityBuilder_1.writeEntityBuilder(customWriter, className, entity.properties);
        });
    });
};
const getPropertyTypeName = (property) => {
    if (propertyTypeGenerators_1.default.has(property.type)) {
        const generatePropertyType = propertyTypeGenerators_1.default.get(property.type);
        return generatePropertyType(property);
    }
    else {
        return 'Property type not supported';
    }
};
const writeEntityConstructor = (customWriter, className, properties) => {
    const parameters = [
        { typeName: 'Builder', name: 'builder' },
    ];
    customWriter.writeConstructor('private', className, parameters, null);
    customWriter.writeCodeBlock(() => {
        customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');
        properties.forEach((property) => {
            const propertyInitialization = property.isOptional ? `builder.${property.name}Option;` :
                `builder.${property.name}Option.ValueOrFailure();`;
            customWriter.writeLine(`${property.name} = ${propertyInitialization}`);
        });
    });
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBQ3pFLDhFQUFzRjtBQUV0RiwyRkFBeUU7QUFHNUQsUUFBQSwwQkFBMEIsR0FBRyxDQUN0QyxNQUFjLEVBQ2QsZUFBdUIsRUFDekIsRUFBRTtJQUNBLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFOUIsc0JBQVMsQ0FBQyxRQUFRLENBQ2QsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLElBQUksU0FBUyxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQ2pFLENBQUMsTUFBa0IsRUFBRSxFQUFFO1FBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixZQUFZLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGdCQUFnQixHQUFvQjtZQUN0QyxJQUFJLEVBQUUsU0FBUztZQUNmLGNBQWMsRUFBRSxRQUFRO1NBQzNCLENBQUM7UUFFRixZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxTQUFTLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7WUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7Z0JBRTVELFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLFNBQVMsTUFBTSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDdkYsWUFBWSxDQUFDLGlCQUFpQixDQUFDO29CQUMzQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7b0JBQ25CLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7b0JBQ3ZDLFFBQVEsRUFBRSxLQUFLO29CQUNmLFFBQVEsRUFBRSxJQUFJO29CQUNkLGNBQWMsRUFBRSxRQUFRO2lCQUMzQixDQUFDLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbkUsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsa0RBQWtELEVBQUUsK0VBQStFLENBQUMsQ0FBQyxDQUFDO1lBRXpLLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QixzREFBa0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQ0EsQ0FBQztJQUVOLENBQUMsQ0FBQyxDQUFDO0FBRVgsQ0FBQyxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFFBQWlDLEVBQVUsRUFBRTtJQUN0RSxJQUFJLGdDQUFxQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUQsTUFBTSxvQkFBb0IsR0FBRyxnQ0FBcUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRGLE9BQU8sb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNILE9BQU8sNkJBQTZCLENBQUM7S0FDeEM7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLHNCQUFzQixHQUFHLENBQUMsWUFBZ0MsRUFBRSxTQUFpQixFQUFFLFVBQXFDLEVBQUUsRUFBRTtJQUMxSCxNQUFNLFVBQVUsR0FBMEI7UUFDdEMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7S0FDM0MsQ0FBQztJQUNGLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RSxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRTtRQUM3QixZQUFZLENBQUMsU0FBUyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFFdkUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtZQUNyRCxNQUFNLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUM7Z0JBQ3BGLFdBQVcsUUFBUSxDQUFDLElBQUksMEJBQTBCLENBQUE7WUFDdEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLE1BQU0sc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFBIn0=