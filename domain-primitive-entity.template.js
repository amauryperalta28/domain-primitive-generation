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
const outputDirectory = './Result_Wepsys_Core_3.1.1';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNEQUFrRDtBQUNsRCwrRUFPeUM7QUFDekMsK0RBQTBEO0FBQzFELHFFQUFpRTtBQU1qRSwwQ0FBMEM7QUFFMUMsTUFBTSxlQUFlLEdBQUcsNEJBQTRCLENBQUM7QUFDckQsSUFBSSxPQUFPLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLFlBQVksRUFBRSxDQUFDO0FBRTdELElBQUkseUJBQXlCLEdBQUcsSUFBSSxHQUFHLEVBUXBDLENBQUM7QUFFSix5QkFBeUIsQ0FBQyxHQUFHLENBQzNCLDZCQUFZLENBQUMsTUFBTSxFQUNuQiw4REFBa0MsQ0FDbkMsQ0FBQztBQUNGLHlCQUF5QixDQUFDLEdBQUcsQ0FDM0IsNkJBQVksQ0FBQyxJQUFJLEVBQ2pCLDREQUFnQyxDQUNqQyxDQUFDO0FBQ0YseUJBQXlCLENBQUMsR0FBRyxDQUMzQiw2QkFBWSxDQUFDLE9BQU8sRUFDcEIsK0RBQW1DLENBQ3BDLENBQUM7QUFDRix5QkFBeUIsQ0FBQyxHQUFHLENBQzNCLDZCQUFZLENBQUMsR0FBRyxFQUNoQiwrREFBbUMsQ0FDcEMsQ0FBQztBQUNGLHlCQUF5QixDQUFDLEdBQUcsQ0FDM0IsNkJBQVksQ0FBQyxRQUFRLEVBQ3JCLDREQUFnQyxDQUNqQyxDQUFDO0FBRUYsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNQLENBQU8sV0FBdUIsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUUxRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1FBQ3hDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQ0YsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUM3QyxzREFBMEIsQ0FDeEIsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsU0FBUyxFQUNoQixNQUFNLENBQUMsVUFBVSxFQUNqQixlQUFlLENBQ2hCLENBQUM7SUFFRixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtRQUM5RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWhDLE1BQU0sZ0NBQWdDLEdBQUcseUJBQXlCLENBQUMsR0FBRyxDQUNwRSxRQUFRLENBQUMsSUFBSSxDQUNkLENBQUM7UUFFRixzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTLEtBQUssRUFBRSxFQUNuRSxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUNyQixnQ0FBZ0MsQ0FDOUIsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLENBQUMsSUFBSSxFQUNYLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=