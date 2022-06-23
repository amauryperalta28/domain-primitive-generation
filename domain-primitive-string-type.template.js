"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const writeDomainPrimitiveGuidProperty_1 = require("./src/domainPrimitiveGenerators/writeDomainPrimitiveGuidProperty");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
templating_1.Generator.generateFromModel(options, (textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    const stringProperties = model.properties.filter((property) => property.type === 'string');
    stringProperties.forEach((property) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${className}.cs` }, (writer) => {
            writer.writeLine(`/* This file contains the code for class '${className}'. */`);
            domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty(writer, className, 'User', 'Users');
            writeDomainPrimitiveGuidProperty_1.writeDomainPrimitiveGuidProperty(writer, 'Id', 'Id', 'Users');
        });
    });
});
const writeDomainPrimitiveEntity = () => {
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBa0Q7QUFDbEQsK0VBQXFGO0FBQ3JGLHVIQUFvSDtBQUNwSCxxRUFBaUU7QUFNakUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBQyxVQUFzQixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUMvRCxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsTUFBTSxnQkFBZ0IsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDekMsQ0FBQztJQUVGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtRQUM3RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWhDLHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxZQUFZLFNBQVMsS0FBSyxFQUFFLEVBQzFDLENBQUMsTUFBa0IsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxTQUFTLENBQ2QsNkNBQTZDLFNBQVMsT0FBTyxDQUM5RCxDQUFDO1lBQ0YsOERBQWtDLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkUsbUVBQWdDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDO0FBRUYsTUFBTSwwQkFBMEIsR0FBRyxHQUFFLEVBQUU7QUFFdkMsQ0FBQyxDQUFBIn0=