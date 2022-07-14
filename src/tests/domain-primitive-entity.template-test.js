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
const outputDirectory = './domainPrimitiveGenerators/templateTestResult';
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
    domainPrimitiveGenerators_1.writeDomainPrimitiveEntity(entity, './domainPrimitiveGenerators/templateTestResult');
    entity.properties.forEach((property) => {
        const className = property.name;
        const domainPrimitivePropertyGenerator = domainPrimitiveGenerators.get(property.type);
        if (domainPrimitiveGenerators.has(property.type)) {
            templating_1.Generator.generate({
                outputFile: `./domainPrimitiveGenerators/templateTestResult/${entity.name}/${className}.cs`,
            }, (writer) => {
                domainPrimitivePropertyGenerator(writer, property, entity.name, entity.namespace);
            });
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1lbnRpdHkudGVtcGxhdGUtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtZW50aXR5LnRlbXBsYXRlLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzREFBa0Q7QUFDbEQsMENBQTBDO0FBQzFDLDRFQU9zQztBQUN0Qyw0REFBdUQ7QUFDdkQsa0VBQThEO0FBTzlELE1BQU0sZUFBZSxHQUFHLGdEQUFnRCxDQUFDO0FBQ3pFLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxJQUFJLHlCQUF5QixHQUFHLElBQUksR0FBRyxFQVFwQyxDQUFDO0FBRUoseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsTUFBTSxFQUFFLDhEQUFrQyxDQUFDLENBQUM7QUFDdkYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsSUFBSSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFDbkYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsT0FBTyxFQUFFLCtEQUFtQyxDQUFDLENBQUM7QUFDekYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsR0FBRyxFQUFFLCtEQUFtQyxDQUFDLENBQUM7QUFDckYseUJBQXlCLENBQUMsR0FBRyxDQUFDLDZCQUFZLENBQUMsUUFBUSxFQUFFLDREQUFnQyxDQUFDLENBQUM7QUFFdkYsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNQLENBQU8sV0FBdUIsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUUxRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1FBQ3hDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQ0YsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUM3QyxzREFBMEIsQ0FDeEIsTUFBTSxFQUNOLGdEQUFnRCxDQUNqRCxDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDOUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxNQUFNLGdDQUFnQyxHQUFHLHlCQUF5QixDQUFDLEdBQUcsQ0FDcEUsUUFBUSxDQUFDLElBQUksQ0FDZCxDQUFDO1FBRUYsSUFBSSx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hELHNCQUFTLENBQUMsUUFBUSxDQUNoQjtnQkFDRSxVQUFVLEVBQUUsa0RBQWtELE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUyxLQUFLO2FBQzVGLEVBQ0QsQ0FBQyxNQUFrQixFQUFFLEVBQUU7Z0JBQ3JCLGdDQUFnQyxDQUM5QixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLFNBQVMsQ0FDakIsQ0FBQztZQUNKLENBQUMsQ0FDRixDQUFDO1NBRUg7SUFFSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9