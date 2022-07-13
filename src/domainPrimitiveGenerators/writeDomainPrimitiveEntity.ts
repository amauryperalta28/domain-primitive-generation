import { TextWriter } from '@yellicode/core';
import { ClassDefinition, ParameterDefinition } from '@yellicode/csharp';
import { Generator } from '@yellicode/templating';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import domainPrimitivePropertyTypeGenerators from '../helpers/propertyTypeGenerators';
import { DomainPrimitiveProperty, Entity } from '../models';
import { writeEntityBuilder } from './writeDomainPrimitiveEntityBuilder';
import _ = require('lodash');

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