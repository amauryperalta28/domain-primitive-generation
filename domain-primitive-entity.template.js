"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const property_types_1 = require("./src/enums/property-types");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
let domainGenerators = new Map();
domainGenerators.set(property_types_1.PropertyType.string, domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty);
domainGenerators.set(property_types_1.PropertyType.guid, domainPrimitiveGenerators_1.writeDomainPrimitiveGuidProperty);
domainGenerators.set(property_types_1.PropertyType.decimal, domainPrimitiveGenerators_1.writeDomainPrimitiveDecimalProperty);
domainGenerators.set(property_types_1.PropertyType.int, domainPrimitiveGenerators_1.writeDomainPrimitiveIntegerProperty);
domainGenerators.set(property_types_1.PropertyType.datetime, domainPrimitiveGenerators_1.writeDomainPrimitiveDateProperty);
templating_1.Generator.generateFromModel(options, (_textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(model.entityName, model.namespace, model.properties);
    model.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitivePropertyGenerator = domainGenerators.get(property.type);
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${className}.cs` }, (writer) => {
            domainPrimitivePropertyGenerator(writer, className, model.entityName, model.namespace);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCwrRUFPeUM7QUFDekMsK0RBQTBEO0FBQzFELHFFQUFpRTtBQUtqRSxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsSUFBSSxPQUFPLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLFlBQVksRUFBRSxDQUFDO0FBRTdELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBUTNCLENBQUM7QUFFSixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxNQUFNLEVBQUUsOERBQWtDLENBQUMsQ0FBQztBQUM5RSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxJQUFJLEVBQUUsNERBQWdDLENBQUMsQ0FBQztBQUMxRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxPQUFPLEVBQUUsK0RBQW1DLENBQUMsQ0FBQztBQUNoRixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxHQUFHLEVBQUUsK0RBQW1DLENBQUMsQ0FBQztBQUM1RSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxRQUFRLEVBQUUsNERBQWdDLENBQUMsQ0FBQztBQUU5RSxzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBQyxXQUF1QixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsc0RBQTBCLENBQ3hCLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxTQUFTLEVBQ2YsS0FBSyxDQUFDLFVBQVUsQ0FDakIsQ0FBQztJQUVGLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1FBQzdELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEMsTUFBTSxnQ0FBZ0MsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdFLHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxZQUFZLEtBQUssQ0FBQyxVQUFVLElBQUksU0FBUyxLQUFLLEVBQUUsRUFDOUQsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDckIsZ0NBQWdDLENBQzlCLE1BQU0sRUFDTixTQUFTLEVBQ1QsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLFNBQVMsQ0FDaEIsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9