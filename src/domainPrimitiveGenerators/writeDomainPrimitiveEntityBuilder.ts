import { ClassDefinition } from "@yellicode/csharp";
import { CustomCsharpWriter } from "../customWriters/customCsharpWriter";
import { PropertyType } from "../enums/property-types";
import { builderPropertyTypeGenerators } from "../helpers";
import { DomainPrimitiveProperty } from "../models";
import _ = require('lodash');

export const writeEntityBuilder = (customWriter: CustomCsharpWriter, className: string,
    properties: DomainPrimitiveProperty[]) => {
    const classDefinitions: ClassDefinition = {
        name: 'Builder',
        accessModifier: 'public',
        inherits: [`AbstractEntityBuilder<${className}>`],
    };

    customWriter.writeOneLineXmlDocSummary(`${className}'s builder. `);
    customWriter.writePublicSealedClass(classDefinitions, () => {

        customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');

        properties.forEach((property: DomainPrimitiveProperty) => {
            customWriter.writeLine(getBuilderPropertyTypeName(property));
            customWriter.writeLine();

        });

        customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
        customWriter.writeLine();

        const requiredProperties = properties.filter(property => !property.isOptional)

        writeDoBuild(className, customWriter, requiredProperties);

        properties.forEach((property: DomainPrimitiveProperty) => {
            writeWithMethod(property, customWriter);
        });
    });
}

const getBuilderPropertyTypeName = (property: DomainPrimitiveProperty): string => {
    if (builderPropertyTypeGenerators.has(property.type)) {
        const generatePropertyType = builderPropertyTypeGenerators.get(property.type);

        return generatePropertyType(property);
    } else {
        return 'Property type not supported';
    }
}

const writeWithMethod = (property: DomainPrimitiveProperty, customWriter: CustomCsharpWriter) => {
    const camelCasePropertyName = _.camelCase(property.name);
    const booleanWithMethodSignature = `public Builder With${property.name}(bool ${camelCasePropertyName})`;
    const generalWithMethodSignature = `public Builder With${property.name}(${property.name} ${camelCasePropertyName})`;
    let WithMethodSignature = property.type === PropertyType.boolean ? booleanWithMethodSignature :  generalWithMethodSignature;

    customWriter.writeLine(WithMethodSignature);

    if (property.type == PropertyType.enum) {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.ValidEnumerationMember(${camelCasePropertyName}, nameof(${camelCasePropertyName}).SomeNotNull()));`);
    } else {
        customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.NotNull(${camelCasePropertyName}, nameof(${camelCasePropertyName}).SomeNotNull()));`);
    }

    customWriter.writeLine();
}

const writeDoBuild = (className: string, customWriter: CustomCsharpWriter, properties: DomainPrimitiveProperty[]) => {
    customWriter.writeLine(`protected override ${className} DoBuild()`);
    customWriter.writeCodeBlock(() => {
        properties.forEach((property) => {
            customWriter.writeLine(`State.IsTrue(${property.name}Option.HasValue, "${className}'s ${property.name} is missing");`)

        });

        customWriter.writeLine();
        customWriter.writeLine(`return new ${className}(this);`)
    });

    customWriter.writeLine();
}