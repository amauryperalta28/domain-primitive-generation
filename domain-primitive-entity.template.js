"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const writeDomainPrimitiveGuidProperty_1 = require("./src/domainPrimitiveGenerators/writeDomainPrimitiveGuidProperty");
const validate_request_1 = require("./src/helpers/validate-request");
const customCsharpWriter_1 = require("./src/customWriters/customCsharpWriter");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
templating_1.Generator.generateFromModel(options, (textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    writeDomainPrimitiveEntity(textWriter, model.entityName, model.folderName, model.properties);
    const stringProperties = model.properties.filter((property) => property.type === 'string');
    const guidProperties = model.properties.filter((property) => property.type === 'Guid');
    stringProperties.forEach((property) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${className}.cs` }, (writer) => {
            domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty(writer, className, 'User', 'Users');
        });
    });
    guidProperties.forEach((property) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${className}.cs` }, (writer) => {
            writeDomainPrimitiveGuidProperty_1.writeDomainPrimitiveGuidProperty(writer, 'Id', 'User', 'Users');
        });
    });
});
const writeDomainPrimitiveEntity = (textWriter, className, folderName, properties) => {
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
    customWriter.writeLine();
    const classDefinitions = {
        name: className,
        accessModifier: 'public',
        xmlDocSummary: [`Represents ${className} entity.`],
    };
    customWriter.writeClassBlock(classDefinitions, (c) => {
        properties.forEach((property) => {
            customWriter.writeAutoProperty({
                name: property.name,
                typeName: property.name,
                noGetter: false,
                noSetter: true,
                accessModifier: 'public',
                xmlDocSummary: [`Represents ${className}'s ${property.name}`],
            });
            customWriter.writeLine();
        });
        const parameters = [
            { typeName: 'Builder', name: 'builder' },
        ];
        customWriter.writePrivateConstructor(className, parameters, null);
        customWriter.writeCodeBlock(() => {
            customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');
        });
        customWriter.writeLine();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCwrRUFBcUY7QUFDckYsdUhBQW9IO0FBQ3BILHFFQUFpRTtBQUdqRSwrRUFBNEU7QUFNNUUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBQyxVQUFzQixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUMvRCxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsMEJBQTBCLENBQ3hCLFVBQVUsRUFDVixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxDQUNqQixDQUFDO0lBRUYsTUFBTSxnQkFBZ0IsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDekMsQ0FBQztJQUVGLE1BQU0sY0FBYyxHQUE4QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDdkUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUN2QyxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1FBQzdE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