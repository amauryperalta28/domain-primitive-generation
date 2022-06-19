"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const validate_request_1 = require("./helpers/validate-request");
templating_1.Generator.generateFromModel({ outputFile: './result/entity.txt' }, (writer, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    writer.writeLine(`API description of, generated from 'domain-primitives-definition.json' at ${new Date().toISOString()}.`);
    writer.writeLine();
    writer.writeLine('my Properties:');
    for (const property in model.properties) {
        const value = model.properties[property];
        writer.writeLineIndented(`public ${value.name} { get; }`);
        writer.writeLineIndented(value.type);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBa0Q7QUFFbEQsaUVBQTZEO0FBRTdELHNCQUFTLENBQUMsaUJBQWlCLENBQ3pCLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLEVBQ3JDLENBQUMsTUFBa0IsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDM0QsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQ2QsNkVBQTZFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FDekcsQ0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkMsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztBQUNILENBQUMsQ0FDRixDQUFDIn0=