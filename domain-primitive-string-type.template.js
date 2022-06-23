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
        const errorMessageField = {
            name: 'ErrorMessage',
            isStatic: true,
            typeName: 'Message',
            defaultValue: `new("Invalid value or format for ${classDefinitions.name}")`,
            accessModifier: 'private',
        };
        const StringLengthRangeField = {
            name: 'StringLengthRange',
            isStatic: true,
            typeName: 'LengthRange',
            defaultValue: '(2, 30).ToLengthRange()',
            accessModifier: 'private',
        };
        customWriter.writeXmlDocParagraph(['Represents the Description minimum length restriction.']);
        customWriter.writePublicFieldConst('MinLength', 'int', 1);
        customWriter.writeLine();
        customWriter.writeXmlDocParagraph(['Represents the Description max length restriction.']);
        customWriter.writePublicFieldConst('MinLength', 'MaxLength', 100);
        customWriter.writeLine();
        customWriter.writeField(errorMessageField);
        customWriter.writeField(StringLengthRangeField);
        customWriter.writeLine();
        customWriter.writeXmlDocSummary([`Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
            `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
            `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`
        ]);
        customWriter.writeShortMethodInitialized({ name: 'From', returnTypeName: classDefinitions.name });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBa0U7QUFDbEUsc0RBQWtEO0FBQ2xELCtFQUE0RTtBQUM1RSxxRUFBaUU7QUFPakUsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxZQUFZLEVBQUUsQ0FBQztBQUU3RCxNQUFNLDRCQUE0QixHQUFHLENBQ25DLFVBQXNCLEVBQ3RCLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFvQjtRQUN4QyxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3ZDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixVQUFVLE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDOUQsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixZQUFZLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRW5CLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM3QyxNQUFNLGlCQUFpQixHQUEwQjtZQUMvQyxJQUFJLEVBQUUsY0FBYztZQUNwQixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFB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