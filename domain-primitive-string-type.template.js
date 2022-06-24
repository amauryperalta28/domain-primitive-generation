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
    const guidProperties = model.properties.filter((property) => property.type === 'Guid');
    stringProperties.forEach((property) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${className}.cs` }, (writer) => {
            domainPrimitiveGenerators_1.writeDomainPrimitiveStringProperty(writer, className, 'User', 'Users');
        });
    });
    guidProperties.forEach((property) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${className}.cs` }, (writer) => {
            writeDomainPrimitiveGuidProperty_1.writeDomainPrimitiveGuidProperty(writer, 'Id', 'Id', 'Users');
        });
    });
});
const writeDomainPrimitiveEntity = () => {
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBa0Q7QUFDbEQsK0VBQXFGO0FBQ3JGLHVIQUFvSDtBQUNwSCxxRUFBaUU7QUFNakUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBQyxVQUFzQixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUMvRCxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsTUFBTSxnQkFBZ0IsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDekMsQ0FBQztJQUVGLE1BQU0sY0FBYyxHQUE4QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDdkUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUN2QyxDQUFDO0lBR0YsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1FBQzdELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEMsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLFlBQVksU0FBUyxLQUFLLEVBQUUsRUFDMUMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFFckIsOERBQWtDLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUdILGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7UUFDM0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVoQyxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsWUFBWSxTQUFTLEtBQUssRUFBRSxFQUMxQyxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUVyQixtRUFBZ0MsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUNGLENBQUM7QUFFRixNQUFNLDBCQUEwQixHQUFHLEdBQUUsRUFBRTtBQUV2QyxDQUFDLENBQUEifQ==