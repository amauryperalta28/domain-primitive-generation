"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeEntityBuilder = void 0;
const property_types_1 = require("../enums/property-types");
const helpers_1 = require("../helpers");
const _ = require("lodash");
exports.writeEntityBuilder = (customWriter, className, properties) => {
    const classDefinitions = {
        name: 'Builder',
        accessModifier: 'public',
        inherits: [`AbstractEntityBuilder<${className}>`],
    };
    customWriter.writeOneLineXmlDocSummary(`${className}'s builder. `);
    customWriter.writePublicSealedClass(classDefinitions, () => {
        customWriter.writeLine('/// <inheritdoc />');
        customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine();
        customWriter.writeLine('/// <inheritdoc />');
        customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine();
        properties.forEach((property) => {
            customWriter.writeLine(getBuilderPropertyTypeName(property));
            customWriter.writeLine();
        });
        customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
        customWriter.writeLine();
        const requiredProperties = properties.filter(property => !property.isOptional);
        writeDoBuild(className, customWriter, requiredProperties);
        properties.forEach((property) => {
            writeWithMethod(property, className, customWriter);
        });
    });
};
const getBuilderPropertyTypeName = (property) => {
    if (helpers_1.builderPropertyTypeGenerators.has(property.type)) {
        const generatePropertyType = helpers_1.builderPropertyTypeGenerators.get(property.type);
        return generatePropertyType(property);
    }
    else {
        return 'Property type not supported';
    }
};
const writeMethodDocumentation = (entityName, propertyName, customWriter) => {
    customWriter.writeLine('/// <summary>');
    customWriter.writeLine(`/// Sets ${entityName}'s ${propertyName}`);
    customWriter.writeLine(`/// <param name="${propertyName}"></param>`);
    customWriter.writeLine('/// <returns></returns>');
};
const writeWithMethod = (property, entityName, customWriter) => {
    const camelCasePropertyName = _.camelCase(property.name);
    const booleanWithMethodSignature = `public Builder With${property.name}(bool ${camelCasePropertyName})`;
    const generalWithMethodSignature = `public Builder With${property.name}(${property.name} ${camelCasePropertyName})`;
    let WithMethodSignature = property.type === property_types_1.PropertyType.boolean ? booleanWithMethodSignature : generalWithMethodSignature;
    writeMethodDocumentation(entityName, camelCasePropertyName, customWriter);
    customWriter.writeLine(WithMethodSignature);
    if (property.type == property_types_1.PropertyType.enum) {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.ValidEnumerationMember(${camelCasePropertyName}, nameof(${camelCasePropertyName})).SomeNotNull());`);
    }
    else {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.NotNull(${camelCasePropertyName}, nameof(${camelCasePropertyName})).SomeNotNull());`);
    }
    customWriter.writeLine();
};
const writeDoBuild = (className, customWriter, properties) => {
    customWriter.writeLine('/// <inheritdoc />');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHlCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHlCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDREQUF1RDtBQUN2RCx3Q0FBMkQ7QUFFM0QsNEJBQTZCO0FBRWhCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxZQUFnQyxFQUFFLFNBQWlCLEVBQ2xGLFVBQXFDLEVBQUUsRUFBRTtJQUN6QyxNQUFNLGdCQUFnQixHQUFvQjtRQUN0QyxJQUFJLEVBQUUsU0FBUztRQUNmLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLFFBQVEsRUFBRSxDQUFDLHlCQUF5QixTQUFTLEdBQUcsQ0FBQztLQUNwRCxDQUFDO0lBRUYsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztJQUNuRSxZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQ3ZELFlBQVksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3QyxZQUFZLENBQUMsU0FBUyxDQUFDLHNGQUFzRixDQUFDLENBQUM7UUFDL0csWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFlBQVksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3QyxZQUFZLENBQUMsU0FBUyxDQUFDLHFGQUFxRixDQUFDLENBQUM7UUFDOUcsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUU7WUFDckQsWUFBWSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUU3QixDQUFDLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxTQUFTLENBQUMsc0ZBQXNG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