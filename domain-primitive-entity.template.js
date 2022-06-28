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
let domainGenerators = new Map();
domainGenerators.set(property_types_1.PropertyType.string, domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty);
domainGenerators.set(property_types_1.PropertyType.guid, domainPrimitiveGenerators_1.writeDomainPrimitiveGuidProperty);
domainGenerators.set(property_types_1.PropertyType.decimal, domainPrimitiveGenerators_1.writeDomainPrimitiveDecimalProperty);
domainGenerators.set(property_types_1.PropertyType.int, domainPrimitiveGenerators_1.writeDomainPrimitiveIntegerProperty);
domainGenerators.set(property_types_1.PropertyType.datetime, domainPrimitiveGenerators_1.writeDomainPrimitiveDateProperty);
templating_1.Generator.generateFromModel(options, (_textWriter, model) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    yield fsPromises.rm(outputDirectory, { recursive: true });
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(model.entityName, model.namespace, model.properties);
    model.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitivePropertyGenerator = domainGenerators.get(property.type);
        templating_1.Generator.generate({ outputFile: `./result/${model.entityName}/${className}.cs` }, (writer) => {
            domainPrimitivePropertyGenerator(writer, className, model.entityName, model.namespace);
        });
    });
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNEQUFrRDtBQUNsRCwrRUFPeUM7QUFDekMsK0RBQTBEO0FBQzFELHFFQUFpRTtBQUlqRSwwQ0FBMEM7QUFFMUMsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxJQUFJLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQVEzQixDQUFDO0FBRUosZ0JBQWdCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsTUFBTSxFQUFFLDhEQUFrQyxDQUFDLENBQUM7QUFDOUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsSUFBSSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFDMUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsT0FBTyxFQUFFLCtEQUFtQyxDQUFDLENBQUM7QUFDaEYsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsR0FBRyxFQUFFLCtEQUFtQyxDQUFDLENBQUM7QUFDNUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsUUFBUSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFJOUUsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNSLENBQU8sV0FBdUIsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUUxRCxzREFBMEIsQ0FDeEIsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsVUFBVSxDQUNqQixDQUFDO0lBRUYsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDN0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxNQUFNLGdDQUFnQyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0Usc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLFlBQVksS0FBSyxDQUFDLFVBQVUsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUM5RCxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUNyQixnQ0FBZ0MsQ0FDOUIsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsU0FBUyxDQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUNGLENBQUMifQ==