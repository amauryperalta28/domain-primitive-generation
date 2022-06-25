"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const writeDomainPrimitiveGuidProperty_1 = require("./src/domainPrimitiveGenerators/writeDomainPrimitiveGuidProperty");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
templating_1.Generator.generateFromModel(options, (textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(textWriter, model.entityName, model.folderName, model.properties);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCwrRUFBaUg7QUFDakgsdUhBQW9IO0FBQ3BILHFFQUFpRTtBQU1qRSxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsSUFBSSxPQUFPLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLFlBQVksRUFBRSxDQUFDO0FBRTdELHNCQUFTLENBQUMsaUJBQWlCLENBQ3pCLE9BQU8sRUFDUCxDQUFDLFVBQXNCLEVBQUUsS0FBb0MsRUFBRSxFQUFFO0lBQy9ELE1BQU0sZ0JBQWdCLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7SUFFRCxzREFBMEIsQ0FDeEIsVUFBVSxFQUNWLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxVQUFVLENBQ2pCLENBQUM7SUFFRixNQUFNLGdCQUFnQixHQUE4QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDekUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUN6QyxDQUFDO0lBRUYsTUFBTSxjQUFjLEdBQThCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUN2RSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLENBQ3ZDLENBQUM7SUFFRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDN0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsWUFBWSxTQUFTLEtBQUssRUFBRSxFQUMxQyxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUNyQiw4REFBa0MsQ0FDaEMsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxDQUNSLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtRQUMzRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWhDLHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxZQUFZLFNBQVMsS0FBSyxFQUFFLEVBQzFDLENBQUMsTUFBa0IsRUFBRSxFQUFFO1lBQ3JCLG1FQUFnQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9