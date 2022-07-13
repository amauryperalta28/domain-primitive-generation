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
    if (helpers_1.builderPropertyTypeGenerators.has(property.type)) {
        const generatePropertyType = helpers_1.builderPropertyTypeGenerators.get(property.type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHlCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVEb21haW5QcmltaXRpdmVFbnRpdHlCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDREQUF1RDtBQUN2RCx3Q0FBMkQ7QUFFM0QsNEJBQTZCO0FBRWhCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxZQUFnQyxFQUFFLFNBQWlCLEVBQ2xGLFVBQXFDLEVBQUUsRUFBRTtJQUN6QyxNQUFNLGdCQUFnQixHQUFvQjtRQUN0QyxJQUFJLEVBQUUsU0FBUztRQUNmLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLFFBQVEsRUFBRSxDQUFDLHlCQUF5QixTQUFTLEdBQUcsQ0FBQztLQUNwRCxDQUFDO0lBRUYsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztJQUNuRSxZQUFZLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBRXZELFlBQVksQ0FBQyxTQUFTLENBQUMsc0ZBQXNGLENBQUMsQ0FBQztRQUMvRyxZQUFZLENBQUMsU0FBUyxDQUFDLHFGQUFxRixDQUFDLENBQUM7UUFFOUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtZQUNyRCxZQUFZLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLFNBQVMsQ0FBQyxzRkFBc0YsQ0FBQyxDQUFDO1FBQy9HLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV6QixNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUU5RSxZQUFZLENB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