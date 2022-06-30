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
const domainPrimitiveGenerators_1 = require("../domainPrimitiveGenerators");
const property_types_1 = require("../enums/property-types");
const validate_request_1 = require("../helpers/validate-request");
const outputDirectory = './domainPrimitiveGenerators/template-test-result';
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
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(entity.name, entity.namespace, entity.properties);
    entity.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitivePropertyGenerator = domainPrimitiveGenerators.get(property.type);
        templating_1.Generator.generate({ outputFile: `./domainPrimitiveGenerators/template-test-result/${entity.name}/${className}.cs` }, (writer) => {
            domainPrimitivePropertyGenerator(writer, property, entity.name, entity.namespace);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtZW50aXR5LnRlbXBsYXRlLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzREFBa0Q7QUFDbEQsMENBQTBDO0FBQzFDLDRFQUE0UDtBQUM1UCw0REFBdUQ7QUFDdkQsa0VBQThEO0FBRzlELE1BQU0sZUFBZSxHQUFHLGtEQUFrRCxDQUFDO0FBQzNFLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxJQUFJLHlCQUF5QixHQUFHLElBQUksR0FBRyxFQVFwQyxDQUFDO0FBRUoseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsTUFBTSxFQUFFLDhEQUFrQyxDQUFDLENBQUM7QUFDdkYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsSUFBSSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFDbkYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsT0FBTyxFQUFFLCtEQUFtQyxDQUFDLENBQUM7QUFDekYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsR0FBRyxFQUFFLCtEQUFtQyxDQUFDLENBQUM7QUFDckYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsUUFBUSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFFdkYsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNSLENBQU8sV0FBdUIsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUUxRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBQyxFQUFFO1FBQ3ZDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBLENBQ0YsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUFjLEVBQUMsRUFBRTtJQUM1QyxzREFBMEIsQ0FDeEIsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsU0FBUyxFQUNoQixNQUFNLENBQUMsVUFBVSxDQUNsQixDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDOUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxNQUFNLGdDQUFnQyxHQUFHLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEYsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLG9EQUFvRCxNQUFNLENBQUMsSUFBSSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQ2pHLENBQUMsTUFBa0IsRUFBRSxFQUFFO1lBQ3JCLGdDQUFnQyxDQUM5QixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLFNBQVMsQ0FDakIsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEifQ==