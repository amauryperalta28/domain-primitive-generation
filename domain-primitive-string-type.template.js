"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("@yellicode/csharp");
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("./src/customWriters/customCsharpWriter");
const validate_request_1 = require("./src/helpers/validate-request");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
const writeDomainPrimitiveClass = (textWriter, className) => {
    const classDefinitions = {
        name: className,
        implements: ['AbstractStringPrimitive'],
        accessModifier: 'public',
        xmlDocSummary: ["Represents an entity's description"],
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
        options = { outputFile: `${outputDirectory}/${property.name}.cs` };
        const className = property.name;
        writeDomainPrimitiveClass(textWriter, className);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FHMkI7QUFDM0Isc0RBQWtEO0FBQ2xELCtFQUE0RTtBQUM1RSxxRUFBaUU7QUFPakUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxNQUFNLHlCQUF5QixHQUFHLENBQ2hDLFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3ZDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ3RELENBQUM7SUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUd4RCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixNQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsTUFBTSxrQkFBa0IsR0FBMEI7WUFDaEQsSUFBSSxFQUFFLGNBQWM7WUFDcEIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsU0FBUztZQUNuQixZQUFZLEVBQUUsb0NBQW9DLGdCQUFnQixDQUFDLElBQUksSUFBSTtZQUMzRSxjQUFjLEVBQUUsU0FBUztTQUMxQixDQUFDO1FBRUYsTUFBTSxtQkFBbUIsR0FBMEI7WUFDakQsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFlBQVksRUFBRSx5QkFBeUI7WUFDdkMsY0FBYyxFQUFFLFNBQVM7U0FDMUIsQ0FBQztRQUVGLFlBQVksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixzQkFBUyxDQUFDLGlCQUFpQixDQUN6QixPQUFPLEVBQ1AsQ0FBQyxVQUFzQixFQUFFLEtBQW9DLEVBQUUsRUFBRTtJQUMvRCxNQUFNLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNDO0lBRUQsTUFBTSxnQkFBZ0IsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDekMsQ0FBQztJQUlGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMzQyxPQUFPLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFlLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7UUFDbkUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoQyx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9