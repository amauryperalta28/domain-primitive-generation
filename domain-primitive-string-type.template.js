"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("@yellicode/csharp");
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("./src/customWriters/customCsharpWriter");
const validate_request_1 = require("./src/helpers/validate-request");
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
    const markdown = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
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
            markdown.writeStaticReadonlyProperty('Message', 'ErrorMessage', 'new("Invalid value or format for citizen names.")');
            markdown.writeStaticReadonlyProperty('StringLengthRange', 'LengthRange', '(2, 30).ToLengthRange()');
            markdown.writeStaticReadonlyProperty('string', 'Names');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FLMkI7QUFDM0Isc0RBQWtEO0FBQ2xELCtFQUE0RTtBQUM1RSxxRUFBaUU7QUEyQmpFLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUNuQyxNQUFNLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsWUFBWSxFQUFFLENBQUM7QUFFL0QsTUFBTSx1QkFBdUIsR0FBRyxDQUM5QixZQUFvQixFQUNwQixjQUE4QixFQUNWLEVBQUU7SUFDdEIsT0FBTztRQUNMLElBQUksRUFBRSxZQUFZO1FBQ2xCLFFBQVEsRUFBRSxRQUFRO1FBRWxCLGNBQWMsRUFBRSxjQUFjO1FBQzlCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLHNCQUFTLENBQUMsaUJBQWlCLENBQ3pCLE9BQU8sRUFDUCxDQUFDLFVBQXNCLEVBQUUsS0FBb0MsRUFBRSxFQUFFO0lBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sZ0JBQWdCLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDcEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFFekQsTUFBTSxnQkFBZ0IsR0FBb0I7WUFDeEMsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUN2QyxjQUFjLEVBQUUsUUFBUTtTQUN6QixDQUFDO1FBRUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzdDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG1EQUFtRCxDQUFDLENBQUM7WUFDckgsUUFBUSxDQUFDLDJCQUEyQixDQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3BHLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDIn0=