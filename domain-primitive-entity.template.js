"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
let domainGenerators = new Map();
domainGenerators.set('string', domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty);
domainGenerators.set('guid', domainPrimitiveGenerators_1.writeDomainPrimitiveGuidProperty);
domainGenerators.set('decimal', domainPrimitiveGenerators_1.writeDomainPrimitiveDecimalProperty);
domainGenerators.set('int', domainPrimitiveGenerators_1.writeDomainPrimitiveIntegerProperty);
templating_1.Generator.generateFromModel(options, (_textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(model.entityName, model.folderName, model.properties);
    model.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitiveGenerator = domainGenerators.get(property.type);
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${className}.cs` }, (writer) => {
            domainPrimitiveGenerator(writer, className, model.entityName, model.folderName);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCwrRUFNeUM7QUFDekMscUVBQWlFO0FBTWpFLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUNuQyxJQUFJLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsWUFBWSxFQUFFLENBQUM7QUFFN0QsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFRM0IsQ0FBQztBQUVKLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsOERBQWtDLENBQUMsQ0FBQztBQUNuRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFDL0QsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwrREFBbUMsQ0FBQyxDQUFDO0FBQ3JFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsK0RBQW1DLENBQUMsQ0FBQztBQUVqRSxzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBQyxXQUF1QixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsc0RBQTBCLENBQ3hCLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxVQUFVLENBQ2pCLENBQUM7SUFFRixLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEMsTUFBTSx3QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJFLHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxZQUFZLEtBQUssQ0FBQyxVQUFVLElBQUksU0FBUyxLQUFLLEVBQUUsRUFDOUQsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDckIsd0JBQXdCLENBQ3RCLE1BQU0sRUFDTixTQUFTLEVBQ1QsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLFVBQVUsQ0FDakIsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9