"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
templating_1.Generator.generateFromModel(options, (_textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(model.entityName, model.folderName, model.properties);
    const stringProperties = model.properties.filter((property) => property.type === 'string');
    const guidProperties = model.properties.filter((property) => property.type === 'guid');
    const decimalProperties = model.properties.filter((property) => property.type === 'decimal');
    const integerProperties = model.properties.filter((property) => property.type === 'int');
    stringProperties.forEach((property) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${className}.cs` }, (writer) => {
            domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty(writer, className, model.entityName, model.folderName);
        });
    });
    guidProperties.forEach((property) => {
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${property.name}.cs` }, (writer) => {
            domainPrimitiveGenerators_1.writeDomainPrimitiveGuidProperty(writer, property.name, model.entityName, model.folderName);
        });
    });
    decimalProperties.forEach((property) => {
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${property.name}.cs` }, (writer) => {
            domainPrimitiveGenerators_1.writeDomainPrimitiveDecimalProperty(writer, property.name, model.entityName, model.folderName);
        });
    });
    integerProperties.forEach((property) => {
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${property.name}.cs` }, (writer) => {
            domainPrimitiveGenerators_1.writeDomainPrimitiveIntegerProperty(writer, property.name, model.entityName, model.folderName);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCwrRUFHcUY7QUFDckYscUVBQWlFO0FBTWpFLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUNuQyxJQUFJLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsWUFBWSxFQUFFLENBQUM7QUFFN0Qsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNQLENBQUMsV0FBdUIsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDaEUsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELHNEQUEwQixDQUN4QixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxDQUNqQixDQUFDO0lBRUYsTUFBTSxnQkFBZ0IsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDekMsQ0FBQztJQUVGLE1BQU0sY0FBYyxHQUE4QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDdkUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUN2QyxDQUFDO0lBRUYsTUFBTSxpQkFBaUIsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQzFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDMUMsQ0FBQztJQUVGLE1BQU0saUJBQWlCLEdBQThCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUMxRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxLQUFLLENBQ3RDLENBQUM7SUFFRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDN0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsWUFBWSxLQUFLLENBQUMsVUFBVSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQzlELENBQUMsTUFBa0IsRUFBRSxFQUFFO1lBQ3JCLDhEQUFrQyxDQUNoQyxNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxVQUFVLENBQ2pCLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtRQUMzRCxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsWUFBWSxLQUFLLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUNsRSxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUNyQiw0REFBZ0MsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBR0gsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1FBQzlELHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxZQUFZLEtBQUssQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxFQUFFLEVBQ2xFLENBQUMsTUFBa0IsRUFBRSxFQUFFO1lBQ3JCLCtEQUFtQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pHLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDOUQsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLFlBQVksS0FBSyxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFDbEUsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDckIsK0RBQW1DLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakcsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FDRixDQUFDIn0=