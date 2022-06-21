"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("@yellicode/csharp");
const templating_1 = require("@yellicode/templating");
const validate_request_1 = require("./helpers/validate-request");
const customWriter_1 = require("./customWriters/customWriter");
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
    const markdown = new customWriter_1.CustomWriter(writer);
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
            markdown.writePublicStaticMethodReturningProperty('Names');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FLMkI7QUFFM0Isc0RBQWtEO0FBQ2xELGlFQUE2RDtBQUU3RCwrREFBNEQ7QUEwQjVELE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUNuQyxNQUFNLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsWUFBWSxFQUFFLENBQUM7QUFFL0QsTUFBTSx1QkFBdUIsR0FBRyxDQUM5QixZQUFvQixFQUNwQixjQUE4QixFQUNWLEVBQUU7SUFDdEIsT0FBTztRQUNMLElBQUksRUFBRSxZQUFZO1FBQ2xCLFFBQVEsRUFBRSxRQUFRO1FBRWxCLGNBQWMsRUFBRSxjQUFjO1FBQzlCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLHNCQUFTLENBQUMsaUJBQWlCLENBQ3pCLE9BQU8sRUFDUCxDQUFDLFVBQXNCLEVBQUUsS0FBb0MsRUFBRSxFQUFFO0lBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztJQUNwRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUV6RCxNQUFNLGdCQUFnQixHQUFvQjtZQUN4QyxJQUFJLEVBQUUsTUFBTTtZQUNaLFVBQVUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1lBQ3ZDLGNBQWMsRUFBRSxRQUFRO1NBQ3pCLENBQUM7UUFFRixNQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsUUFBUSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsbURBQW1ELENBQUMsQ0FBQztZQUNySCxRQUFRLENBQUMsMkJBQTJCLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDcEcsUUFBUSxDQUFDLHdDQUF3QyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9