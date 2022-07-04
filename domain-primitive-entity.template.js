"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const property_types_1 = require("./src/enums/property-types");
const validate_request_1 = require("./src/helpers/validate-request");
const fsPromises = require("fs/promises");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
let domainPrimitiveGenerators = new Map();
domainPrimitiveGenerators.set(property_types_1.PropertyType.string, domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.guid, domainPrimitiveGenerators_1.writeDomainPrimitiveGuidProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.decimal, domainPrimitiveGenerators_1.writeDomainPrimitiveDecimalProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.int, domainPrimitiveGenerators_1.writeDomainPrimitiveIntegerProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.datetime, domainPrimitiveGenerators_1.writeDomainPrimitiveDateProperty);
templating_1.Generator.generateFromModel(options, (_textWriter, model) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    yield fsPromises.rm(outputDirectory, { recursive: true });
    model.entities.forEach((entity) => {
        generateEntityClass(entity);
    });
}));
const generateEntityClass = (entity) => {
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(entity.name, entity.namespace, entity.properties, outputDirectory);
    entity.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitivePropertyGenerator = domainPrimitiveGenerators.get(property.type);
        templating_1.Generator.generate({ outputFile: `${outputDirectory}/${entity.name}/${className}.cs` }, (writer) => {
            domainPrimitivePropertyGenerator(writer, property, entity.name, entity.namespace);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNEQUFrRDtBQUNsRCwrRUFPeUM7QUFDekMsK0RBQTBEO0FBQzFELHFFQUFpRTtBQU1qRSwwQ0FBMEM7QUFFMUMsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxJQUFJLHlCQUF5QixHQUFHLElBQUksR0FBRyxFQVFwQyxDQUFDO0FBRUoseUJBQXlCLENBQUMsR0FBRyxDQUMzQiw2QkFBWSxDQUFDLE1BQU0sRUFDbkIsOERBQWtDLENBQ25DLENBQUM7QUFDRix5QkFBeUIsQ0FBQyxHQUFHLENBQzNCLDZCQUFZLENBQUMsSUFBSSxFQUNqQiw0REFBZ0MsQ0FDakMsQ0FBQztBQUNGLHlCQUF5QixDQUFDLEdBQUcsQ0FDM0IsNkJBQVksQ0FBQyxPQUFPLEVBQ3BCLCtEQUFtQyxDQUNwQyxDQUFDO0FBQ0YseUJBQXlCLENBQUMsR0FBRyxDQUMzQiw2QkFBWSxDQUFDLEdBQUcsRUFDaEIsK0RBQW1DLENBQ3BDLENBQUM7QUFDRix5QkFBeUIsQ0FBQyxHQUFHLENBQzNCLDZCQUFZLENBQUMsUUFBUSxFQUNyQiw0REFBZ0MsQ0FDakMsQ0FBQztBQUVGLHNCQUFTLENBQUMsaUJBQWlCLENBQ3pCLE9BQU8sRUFDUCxDQUFPLFdBQXVCLEVBQUUsS0FBb0MsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sZ0JBQWdCLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7SUFFRCxNQUFNLFVBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFMUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtRQUN4QyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUNGLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDN0Msc0RBQTBCLENBQ3hCLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLFNBQVMsRUFDaEIsTUFBTSxDQUFDLFVBQVUsRUFDakIsZUFBZSxDQUNoQixDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDOUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxNQUFNLGdDQUFnQyxHQUFHLHlCQUF5QixDQUFDLEdBQUcsQ0FDcEUsUUFBUSxDQUFDLElBQUksQ0FDZCxDQUFDO1FBRUYsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUyxLQUFLLEVBQUUsRUFDbkUsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDckIsZ0NBQWdDLENBQzlCLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsU0FBUyxDQUNqQixDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9