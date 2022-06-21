"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("@yellicode/csharp");
const templating_1 = require("@yellicode/templating");
const validate_request_1 = require("./helpers/validate-request");
const outputDirectory = './result';
const options = { outputFile: `${outputDirectory}/Entity.cs` };
const buildStringAutoProperty = (propertyName, accessModifier) => {
    return {
        name: propertyName,
        typeName: 'string',
        accessModifier: accessModifier,
        noGetter: false,
        noSetter: false,
    };
};
templating_1.Generator.generateFromModel(options, (textWriter, model) => {
    const writer = new csharp_1.CSharpWriter(textWriter);
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    writer.writeUsingDirectives('System', 'System.Collections.Generic');
    writer.writeLine();
    writer.writeNamespaceBlock({ name: 'Ri.Novus.Core' }, () => {
        const classDefinitions = {
            name: 'Name',
            implements: ['AbstractStringPrimitive'],
            accessModifier: 'public',
        };
        writer.writeClassBlock(classDefinitions, (c) => {
            c.writeAutoProperty(buildStringAutoProperty('Name', 'private'));
            c.writeAutoProperty(buildStringAutoProperty('Names', 'public'));
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FLMkI7QUFFM0Isc0RBQWtEO0FBQ2xELGlFQUE2RDtBQTJCN0QsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLE1BQU0sT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUUvRCxNQUFNLHVCQUF1QixHQUFHLENBQzlCLFlBQW9CLEVBQ3BCLGNBQThCLEVBQ1YsRUFBRTtJQUN0QixPQUFPO1FBQ0wsSUFBSSxFQUFFLFlBQVk7UUFDbEIsUUFBUSxFQUFFLFFBQVE7UUFFbEIsY0FBYyxFQUFFLGNBQWM7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNQLENBQUMsVUFBc0IsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTVDLE1BQU0sZ0JBQWdCLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDcEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFFekQsTUFBTSxnQkFBZ0IsR0FBb0I7WUFDeEMsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUN2QyxjQUFjLEVBQUUsUUFBUTtTQUN6QixDQUFDO1FBRUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzdDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDIn0=