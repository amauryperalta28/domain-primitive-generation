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
const fsPromises = require("fs/promises");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const property_types_1 = require("./src/enums/property-types");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './Result_Wepsys_Core_3.1.1';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
let domainPrimitiveGenerators = new Map();
domainPrimitiveGenerators.set(property_types_1.PropertyType.string, domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.guid, domainPrimitiveGenerators_1.writeDomainPrimitiveGuidProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.decimal, domainPrimitiveGenerators_1.writeDomainPrimitiveDecimalProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.int, domainPrimitiveGenerators_1.writeDomainPrimitiveIntegerProperty);
domainPrimitiveGenerators.set(property_types_1.PropertyType.dateTime, domainPrimitiveGenerators_1.writeDomainPrimitiveDateProperty);
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
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(entity, outputDirectory);
    entity.properties.forEach((property) => {
        const className = property.name;
        if (domainPrimitiveGenerators.has(property.type)) {
            const domainPrimitivePropertyGenerator = domainPrimitiveGenerators.get(property.type);
            templating_1.Generator.generate({ outputFile: `${outputDirectory}/${entity.name}/${className}.cs` }, (writer) => {
                domainPrimitivePropertyGenerator(writer, property, entity.name, entity.namespace);
            });
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb21haW4tcHJpbWl0aXZlLWVudGl0eS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNEQUFrRDtBQUNsRCwwQ0FBMEM7QUFDMUMsK0VBT3lDO0FBQ3pDLCtEQUEwRDtBQUMxRCxxRUFBaUU7QUFPakUsTUFBTSxlQUFlLEdBQUcsNEJBQTRCLENBQUM7QUFDckQsSUFBSSxPQUFPLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLFlBQVksRUFBRSxDQUFDO0FBRTdELElBQUkseUJBQXlCLEdBQUcsSUFBSSxHQUFHLEVBUXBDLENBQUM7QUFFSix5QkFBeUIsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxNQUFNLEVBQUUsOERBQWtDLENBQUMsQ0FBQztBQUN2Rix5QkFBeUIsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxJQUFJLEVBQUUsNERBQWdDLENBQUMsQ0FBQztBQUNuRix5QkFBeUIsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxPQUFPLEVBQUUsK0RBQW1DLENBQUMsQ0FBQztBQUN6Rix5QkFBeUIsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxHQUFHLEVBQUUsK0RBQW1DLENBQUMsQ0FBQztBQUNyRix5QkFBeUIsQ0FBQyxHQUFHLENBQUMsNkJBQVksQ0FBQyxRQUFRLEVBQUUsNERBQWdDLENBQUMsQ0FBQztBQUV2RixzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBTyxXQUF1QixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUN0RSxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsTUFBTSxVQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTFELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDeEMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FDRixDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO0lBQzdDLHNEQUEwQixDQUN4QixNQUFNLEVBQ04sZUFBZSxDQUNoQixDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDOUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxJQUFJLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxnQ0FBZ0MsR0FBRyx5QkFBeUIsQ0FBQyxHQUFHLENBQ3BFLFFBQVEsQ0FBQyxJQUFJLENBQ2QsQ0FBQztZQUVGLHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQ25FLENBQUMsTUFBa0IsRUFBRSxFQUFFO2dCQUNyQixnQ0FBZ0MsQ0FDOUIsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLENBQUMsSUFBSSxFQUNYLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUM7WUFDSixDQUFDLENBQ0YsQ0FBQztTQUVIO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==