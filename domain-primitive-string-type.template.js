"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("@yellicode/csharp");
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("./src/customWriters/customCsharpWriter");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
const writeDomainPrimitiveProperty = (textWriter, className, entityName) => {
    const classDefinitions = {
        name: className,
        implements: ['AbstractStringPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };
    const writer = new csharp_1.CSharpWriter(textWriter);
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    writer.writeLine();
    customWriter.writeCsharpTenNamespace('Ri.Novus.Core');
    writer.writeLine();
    writer.writeClassBlock(classDefinitions, (c) => {
        const propertyDefinition = {
            name: 'ErrorMessage',
            isStatic: true,
            typeName: 'Message',
            defaultValue: `new("Invalid value or format for ${classDefinitions.name}")`,
            accessModifier: 'private',
        };
        const propertyDefinition2 = {
            name: 'StringLengthRange',
            isStatic: true,
            typeName: 'LengthRange',
            defaultValue: '(2, 30).ToLengthRange()',
            accessModifier: 'private',
        };
        customWriter.writeField(propertyDefinition);
        customWriter.writeField(propertyDefinition2);
    });
};
templating_1.Generator.generateFromModel(options, (textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    const stringProperties = model.properties.filter((property) => property.type === 'string');
    stringProperties.forEach((property, index) => {
        const className = property.name;
        templating_1.Generator.generate({ outputFile: `./result/${className}.cs` }, (writer) => {
            writer.writeLine(`/* This file contains the code for class '${className}'. */`);
            writeDomainPrimitiveProperty(writer, className, 'Citizen');
        });
    });
});
const writeDomainPrimitiveEntity = () => {
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBa0U7QUFDbEUsc0RBQWtEO0FBQ2xELCtFQUE0RTtBQUM1RSxxRUFBaUU7QUFPakUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxNQUFNLDRCQUE0QixHQUFHLENBQ25DLFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3ZDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixZQUFZLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRW5CLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM3QyxNQUFNLGtCQUFrQixHQUEwQjtZQUNoRCxJQUFJLEVBQUUsY0FBYztZQUNwQixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFBRSxvQ0FBb0MsZ0JBQWdCLENBQUMsSUFBSSxJQUFJO1lBQzNFLGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUM7UUFFRixNQUFNLG1CQUFtQixHQUEwQjtZQUNqRCxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsWUFBWSxFQUFFLHlCQUF5QjtZQUN2QyxjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDO1FBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLHNCQUFTLENBQUMsaUJBQWlCLENBQ3pCLE9BQU8sRUFDUCxDQUFDLFVBQXNCLEVBQUUsS0FBb0MsRUFBRSxFQUFFO0lBQy9ELE1BQU0sZ0JBQWdCLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0M7SUFFRCxNQUFNLGdCQUFnQixHQUE4QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDekUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUN6QyxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzNDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEMsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLFlBQVksU0FBUyxLQUFLLEVBQUUsRUFDMUMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDckIsTUFBTSxDQUFDLFNBQVMsQ0FDZCw2Q0FBNkMsU0FBUyxPQUFPLENBQzlELENBQUM7WUFDRiw0QkFBNEIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQztBQUVGLE1BQU0sMEJBQTBCLEdBQUcsR0FBRSxFQUFFO0FBRXZDLENBQUMsQ0FBQSJ9