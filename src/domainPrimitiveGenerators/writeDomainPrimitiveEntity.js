"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDomainPrimitiveEntity = void 0;
const templating_1 = require("@yellicode/templating");
const customCsharpWriter_1 = require("../customWriters/customCsharpWriter");
const property_types_1 = require("../enums/property-types");
const builderPropertyTypeGenerators_1 = require("../helpers/builderPropertyTypeGenerators");
const propertyTypeGenerators_1 = require("../helpers/propertyTypeGenerators");
var _ = require('lodash');
exports.writeDomainPrimitiveEntity = (entity, outputDirectory) => {
    const className = entity.name;
    templating_1.Generator.generate({ outputFile: `${outputDirectory}/${className}/${className}.cs` }, (writer) => {
        const customWriter = new customCsharpWriter_1.CustomCsharpWriter(writer);
        customWriter.writeUsingDirectives('Optional', 'Triplex.Validations');
        customWriter.writeLine();
        customWriter.writeCsharpTenNamespace(entity.namespace);
        customWriter.writeLine();
        const classDefinitions = {
            name: className,
            accessModifier: 'public',
        };
        customWriter.writeOneLineXmlDocSummary(`Represents ${className} entity. `);
        customWriter.writePublicSealedClass(classDefinitions, () => {
            entity.properties.forEach((property) => {
                customWriter.writeOneLineXmlDocSummary(`Represents ${className}'s ${property.name}. `);
                customWriter.writeAutoProperty({
                    name: property.name,
                    typeName: getPropertyTypeName(property),
                    noGetter: false,
                    noSetter: true,
                    accessModifier: 'public',
                });
                customWriter.writeLine();
            });
            writeEntityConstructor(customWriter, className, entity.properties);
            customWriter.writeXmlDocParagraph(['TODO: Remember to write tests for business logic', 'TODO: and then if code coverage decreases comment or delete the code not used']);
            customWriter.writeLine();
            writeEntityBuilder(customWriter, className, entity.properties);
        });
    });
};
const getPropertyTypeName = (property) => {
    if (propertyTypeGenerators_1.default.has(property.type)) {
        const generatePropertyType = propertyTypeGenerators_1.default.get(property.type);
        return generatePropertyType(property);
    }
    else {
        return 'Property type not supported';
    }
};
const writeEntityConstructor = (customWriter, className, properties) => {
    const parameters = [
        { typeName: 'Builder', name: 'builder' },
    ];
    customWriter.writeConstructor('private', className, parameters, null);
    customWriter.writeCodeBlock(() => {
        customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');
        properties.forEach((property) => {
            const propertyInitialization = property.isOptional ? `builder.${property.name}Option;` :
                `builder.${property.name}Option.ValueOrFailure();`;
            customWriter.writeLine(`${property.name} = ${propertyInitialization}`);
        });
    });
    customWriter.writeLine();
};
const writeEntityBuilder = (customWriter, className, properties) => {
    const classDefinitions = {
        name: 'Builder',
        accessModifier: 'public',
        inherits: [`AbstractEntityBuilder<${className}>`],
    };
    customWriter.writeOneLineXmlDocSummary(`${className}'s builder. `);
    customWriter.writePublicSealedClass(classDefinitions, (c) => {
        customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');
        properties.forEach((property) => {
            customWriter.writeLine(getBuilderPropertyTypeName(property));
            customWriter.writeLine();
        });
        customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
        customWriter.writeLine();
        const requiredProperties = properties.filter(property => !property.isOptional);
        writeDoBuild(className, customWriter, requiredProperties);
        properties.forEach((property) => {
            writeWithMethod(property, customWriter);
        });
    });
};
const getBuilderPropertyTypeName = (property) => {
    if (builderPropertyTypeGenerators_1.default.has(property.type)) {
        const generatePropertyType = builderPropertyTypeGenerators_1.default.get(property.type);
        return generatePropertyType(property);
    }
    else {
        return 'Property type not supported';
    }
};
const writeWithMethod = (property, customWriter) => {
    const camelCasePropertyName = _.camelCase(property.name);
    const booleanWithMethodSignature = `public Builder With${property.name}(bool ${camelCasePropertyName})`;
    const generalWithMethodSignature = `public Builder With${property.name}(${property.name} ${camelCasePropertyName})`;
    let WithMethodSignature = property.type === property_types_1.PropertyType.boolean ? booleanWithMethodSignature : generalWithMethodSignature;
    customWriter.writeLine(WithMethodSignature);
    if (property.type == property_types_1.PropertyType.enum) {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.ValidEnumerationMember(${camelCasePropertyName}, nameof(${camelCasePropertyName}).SomeNotNull()));`);
    }
    else {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.NotNull(${camelCasePropertyName}, nameof(${camelCasePropertyName}).SomeNotNull()));`);
    }
    customWriter.writeLine();
};
const writeDoBuild = (className, customWriter, properties) => {
    customWriter.writeLine(`protected override ${className} DoBuild()`);
    customWriter.writeCodeBlock(() => {
        properties.forEach((property) => {
            customWriter.writeLine(`State.IsTrue(${property.name}Option.HasValue, "${className}'s ${property.name} is missing");`);
        });
        customWriter.writeLine();
        customWriter.writeLine(`return new ${className}(this);`);
    });
    customWriter.writeLine();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZURvbWFpblByaW1pdGl2ZUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBa0Q7QUFDbEQsNEVBQXlFO0FBQ3pFLDREQUF1RDtBQUN2RCw0RkFBcUY7QUFDckYsOEVBQXNGO0FBRXRGLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUViLFFBQUEsMEJBQTBCLEdBQUcsQ0FDdEMsTUFBYyxFQUNkLGVBQXVCLEVBQ3pCLEVBQUU7SUFDQSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRTlCLHNCQUFTLENBQUMsUUFBUSxDQUNkLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUNqRSxDQUFDLE1BQWtCLEVBQUUsRUFBRTtRQUNuQixNQUFNLFlBQVksR0FBRyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNyRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsWUFBWSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsTUFBTSxnQkFBZ0IsR0FBb0I7WUFDdEMsSUFBSSxFQUFFLFNBQVM7WUFDZixjQUFjLEVBQUUsUUFBUTtTQUMzQixDQUFDO1FBRUYsWUFBWSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsU0FBUyxXQUFXLENBQUMsQ0FBQztRQUMzRSxZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO2dCQUU1RCxZQUFZLENBQUMseUJBQXlCLENBQUMsY0FBYyxTQUFTLE1BQU0sUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQ3ZGLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUNuQixRQUFRLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxDQUFDO29CQUN2QyxRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUUsSUFBSTtvQkFDZCxjQUFjLEVBQUUsUUFBUTtpQkFDM0IsQ0FBQyxDQUFDO2dCQUNILFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILHNCQUFzQixDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRW5FLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGtEQUFrRCxFQUFFLCtFQUErRSxDQUFDLENBQUMsQ0FBQztZQUV6SyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekIsa0JBQWtCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUNBLENBQUM7SUFFTixDQUFDLENBQUMsQ0FBQztBQUVYLENBQUMsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxRQUFpQyxFQUFVLEVBQUU7SUFDdEUsSUFBSSxnQ0FBcUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFELE1BQU0sb0JBQW9CLEdBQUcsZ0NBQXFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0RixPQUFPLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDSCxPQUFPLDZCQUE2QixDQUFDO0tBQ3hDO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLFlBQWdDLEVBQUUsU0FBaUIsRUFBRSxVQUFxQyxFQUFFLEVBQUU7SUFDMUgsTUFBTSxVQUFVLEdBQTBCO1FBQ3RDLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0tBQzNDLENBQUM7SUFDRixZQUFZLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUU7UUFDN0IsWUFBWSxDQUFDLFNBQVMsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBRXZFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7WUFDckQsTUFBTSxzQkFBc0IsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRixXQUFXLFFBQVEsQ0FBQyxJQUFJLDBCQUEwQixDQUFBO1lBQ3RELFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxNQUFNLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0gsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQTtBQUVELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxZQUFnQyxFQUFFLFNBQWlCLEVBQzNFLFVBQXFDLEVBQUUsRUFBRTtJQUN6QyxNQUFNLGdCQUFnQixHQUFvQjtRQUN0QyxJQUFJLEVBQUUsU0FBUztRQUNmLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLFFBQVEsRUFBRSxDQUFDLHlCQUF5QixTQUFTLEdBQUcsQ0FBQztLQUNwRCxDQUFDO0lBRUYsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztJQUNuRSxZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUV4RCxZQUFZLENBQUMsU0FBUyxDQUFDLHNGQUFzRixDQUFDLENBQUM7UUFDL0csWUFBWSxDQUFDLFNBQVMsQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO1FBRTlHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7WUFDckQsWUFBWSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUU3QixDQUFDLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLENBQUMsc0ZBQXNGLENBQUMsQ0FBQztRQUMvRyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFOUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUxRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1lBQ3JELGVBQWUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQTtBQUVELE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxRQUFpQyxFQUFVLEVBQUU7SUFDN0UsSUFBSSx1Q0FBNkIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xELE1BQU0sb0JBQW9CLEdBQUcsdUNBQTZCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5RSxPQUFPLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDSCxPQUFPLDZCQUE2QixDQUFDO0tBQ3hDO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUFpQyxFQUFFLFlBQWdDLEVBQUUsRUFBRTtJQUM1RixNQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELE1BQU0sMEJBQTBCLEdBQUcsc0JBQXNCLFFBQVEsQ0FBQyxJQUFJLFNBQVMscUJBQXFCLEdBQUcsQ0FBQztJQUN4RyxNQUFNLDBCQUEwQixHQUFHLHNCQUFzQixRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUkscUJBQXFCLEdBQUcsQ0FBQztJQUNwSCxJQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssNkJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBRSwwQkFBMEIsQ0FBQztJQUU1SCxZQUFZLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLDZCQUFZLENBQUMsSUFBSSxFQUFFO1FBQ3BDLFlBQVksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLFFBQVEsQ0FBQyxJQUFJLDZDQUE2QyxxQkFBcUIsWUFBWSxxQkFBcUIsb0JBQW9CLENBQUMsQ0FBQztLQUM1TDtTQUFNO1FBQ0gsWUFBWSxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsUUFBUSxDQUFDLElBQUksOEJBQThCLHFCQUFxQixZQUFZLHFCQUFxQixvQkFBb0IsQ0FBQyxDQUFDO0tBQzdLO0lBRUQsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsU0FBaUIsRUFBRSxZQUFnQyxFQUFFLFVBQXFDLEVBQUUsRUFBRTtJQUNoSCxZQUFZLENBQUMsU0FBUyxDQUFDLHNCQUFzQixTQUFTLFlBQVksQ0FBQyxDQUFDO0lBQ3BFLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFO1FBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM1QixZQUFZLENBQUMsU0FBUyxDQUFDLGdCQUFnQixRQUFRLENBQUMsSUFBSSxxQkFBcUIsU0FBUyxNQUFNLFFBQVEsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUE7UUFFMUgsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLFNBQVMsU0FBUyxDQUFDLENBQUE7SUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFBIn0=