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
domainGenerators.set('datetime', domainPrimitiveGenerators_1.writeDomainPrimitiveDateProperty);
templating_1.Generator.generateFromModel(options, (_textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(model.entityName, model.folderName, model.properties);
    model.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitivePropertyGenerator = domainGenerators.get(property.type);
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${className}.cs` }, (writer) => {
            domainPrimitivePropertyGenerator(writer, className, model.entityName, model.folderName);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCwrRUFPeUM7QUFDekMscUVBQWlFO0FBS2pFLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUNuQyxJQUFJLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsWUFBWSxFQUFFLENBQUM7QUFFN0QsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFRM0IsQ0FBQztBQUVKLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsOERBQWtDLENBQUMsQ0FBQztBQUNuRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFDL0QsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwrREFBbUMsQ0FBQyxDQUFDO0FBQ3JFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsK0RBQW1DLENBQUMsQ0FBQztBQUNqRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFFbkUsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNQLENBQUMsV0FBdUIsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDaEUsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELHNEQUEwQixDQUN4QixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxDQUNqQixDQUFDO0lBRUYsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDN0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxNQUFNLGdDQUFnQyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0Usc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLFlBQVksS0FBSyxDQUFDLFVBQVUsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUM5RCxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUNyQixnQ0FBZ0MsQ0FDOUIsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxDQUNqQixDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDIn0=