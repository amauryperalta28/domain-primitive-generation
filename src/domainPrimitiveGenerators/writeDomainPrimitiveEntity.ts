import { TextWriter } from '@yellicode/core';
import { ClassDefinition, ParameterDefinition } from '@yellicode/csharp';
import { Generator } from '@yellicode/templating';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { PropertyType } from '../enums/property-types';
import builderPropertyTypeGenerators from '../helpers/builderPropertyTypeGenerators';
import domainPrimitivePropertyTypeGenerators from '../helpers/propertyTypeGenerators';
import { DomainPrimitiveProperty, Entity } from '../models';
var _ = require('lodash');

export const writeDomainPrimitiveEntity = (
    entity: Entity,
    outputDirectory: string
) => {
    const className = entity.name;

    Generator.generate(
        { outputFile: `${outputDirectory}/${className}/${className}.cs` },
        (writer: TextWriter) => {
            const customWriter = new CustomCsharpWriter(writer);
            customWriter.writeUsingDirectives('Optional', 'Triplex.Validations');
            customWriter.writeLine();

            customWriter.writeCsharpTenNamespace(entity.namespace);
            customWriter.writeLine();

            const classDefinitions: ClassDefinition = {
                name: className,
                accessModifier: 'public',
            };

            customWriter.writeOneLineXmlDocSummary(`Represents ${className} entity. `);
            customWriter.writePublicSealedClass(classDefinitions, () => {
                entity.properties.forEach((property: DomainPrimitiveProperty) => {

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
            }
            );

        });

};

const getPropertyTypeName = (property: DomainPrimitiveProperty): string => {
    if (domainPrimitivePropertyTypeGenerators.has(property.type)) {
        const generatePropertyType = domainPrimitivePropertyTypeGenerators.get(property.type);

        return generatePropertyType(property);
    } else {
        return 'Property type not supported';
    }
}

const writeEntityConstructor = (customWriter: CustomCsharpWriter, className: string, properties: DomainPrimitiveProperty[]) => {
    const parameters: ParameterDefinition[] = [
        { typeName: 'Builder', name: 'builder' },
    ];
    customWriter.writeConstructor('private', className, parameters, null);
    customWriter.writeCodeBlock(() => {
        customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');

        properties.forEach((property: DomainPrimitiveProperty) => {
            const propertyInitialization = property.isOptional ? `builder.${property.name}Option;` :
                `builder.${property.name}Option.ValueOrFailure();`
            customWriter.writeLine(`${property.name} = ${propertyInitialization}`);
        })
    });
    customWriter.writeLine();
}

const writeEntityBuilder = (customWriter: CustomCsharpWriter, className: string,
    properties: DomainPrimitiveProperty[]) => {
    const classDefinitions: ClassDefinition = {
        name: 'Builder',
        accessModifier: 'public',
        inherits: [`AbstractEntityBuilder<${className}>`],
    };

    customWriter.writeOneLineXmlDocSummary(`${className}'s builder. `);
    customWriter.writePublicSealedClass(classDefinitions, (c) => {

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

