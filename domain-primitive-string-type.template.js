"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const domainPrimitiveGenerators_1 = require("./src/domainPrimitiveGenerators");
const writeDomainPrimitiveGuidProperty_1 = require("./src/domainPrimitiveGenerators/writeDomainPrimitiveGuidProperty");
const validate_request_1 = require("./src/helpers/validate-request");
const customCsharpWriter_1 = require("./src/customWriters/customCsharpWriter");
const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };
templating_1.Generator.generateFromModel(options, (textWriter, model) => {
    const validationResult = validate_request_1.validateRequest(model);
    if (!validationResult.success) {
        throw new Error(validationResult.message);
    }
    writeDomainPrimitiveEntity(textWriter, model.entityName, model.folderName, model.properties);
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
            writeDomainPrimitiveGuidProperty_1.writeDomainPrimitiveGuidProperty(writer, 'Id', 'User', 'Users');
        });
    });
});
const writeDomainPrimitiveEntity = (textWriter, className, folderName, properties) => {
    const customWriter = new customCsharpWriter_1.CustomCsharpWriter(textWriter);
    customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
    customWriter.writeLine();
    const classDefinitions = {
        name: className,
        accessModifier: 'public',
        xmlDocSummary: [`Represents ${className} entity.`],
    };
    customWriter.writeClassBlock(classDefinitions, (c) => {
        properties.forEach((property) => {
            customWriter.writeAutoProperty({
                name: property.name,
                typeName: property.name,
                noGetter: false,
                noSetter: true,
                accessModifier: 'public',
                xmlDocSummary: [`Represents ${className}'s ${property.name}`],
            });
            customWriter.writeLine();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLXByaW1pdGl2ZS1zdHJpbmctdHlwZS50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbWFpbi1wcmltaXRpdmUtc3RyaW5nLXR5cGUudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBa0Q7QUFDbEQsK0VBQXFGO0FBQ3JGLHVIQUFvSDtBQUNwSCxxRUFBaUU7QUFHakUsK0VBQTRFO0FBTTVFLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUNuQyxJQUFJLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWUsWUFBWSxFQUFFLENBQUM7QUFFN0Qsc0JBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsT0FBTyxFQUNQLENBQUMsVUFBc0IsRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELDBCQUEwQixDQUN4QixVQUFVLEVBQ1YsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLFVBQVUsQ0FDakIsQ0FBQztJQUVGLE1BQU0sZ0JBQWdCLEdBQThCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUN6RSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLENBQ3pDLENBQUM7SUFFRixNQUFNLGNBQWMsR0FBOEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3ZFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FDdkMsQ0FBQztJQUVGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtRQUM3RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWhDLHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxZQUFZLFNBQVMsS0FBSyxFQUFFLEVBQzFDLENBQUMsTUFBa0IsRUFBRSxFQUFFO1lBQ3JCLDhEQUFrQyxDQUNoQyxNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLENBQ1IsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1FBQzNELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEMsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLFlBQVksU0FBUyxLQUFLLEVBQUUsRUFDMUMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDckIsbUVBQWdDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDO0FBRUYsTUFBTSwwQkFBMEIsR0FBRyxDQUNqQyxVQUFzQixFQUN0QixTQUFpQixFQUNqQixVQUFrQixFQUNsQixVQUFxQyxFQUNyQyxFQUFFO0lBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RCxZQUFZLENBQUMsdUJBQXVCLENBQUMsaUJBQWlCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXpCLE1BQU0sZ0JBQWdCLEdBQW9CO1FBQ3hDLElBQUksRUFBRSxTQUFTO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsYUFBYSxFQUFFLENBQUMsY0FBYyxTQUFTLFVBQVUsQ0FBQztLQUNuRCxDQUFDO0lBQ0YsWUFBWSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25ELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QixZQUFZLENBQUMsaUJBQWlCLENBQUM7Z0JBQzdCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUN2QixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxjQUFjLEVBQUUsUUFBUTtnQkFDeEIsYUFBYSxFQUFFLENBQUMsY0FBYyxTQUFTLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzlELENBQUMsQ0FBQztZQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBR0wsQ0FBQyxDQUFDIn0=