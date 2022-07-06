import { TextWriter } from '@yellicode/core';
import { ClassDefinition, ParameterDefinition } from '@yellicode/csharp';
import { Generator } from '@yellicode/templating';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';
var _ = require('lodash');

export const writeDomainPrimitiveEntity = (
    className: string,
    namespace: string,
    properties: DomainPrimitiveProperty[],
    outputDirectory: string
) => {

    Generator.generate(
        { outputFile: `${outputDirectory}/${className}/${className}.cs` },
        (writer: TextWriter) => {
            const customWriter = new CustomCsharpWriter(writer);
            customWriter.writeUsingDirectives('Optional', 'Triplex.Validations');
            customWriter.writeLine();

            customWriter.writeCsharpTenNamespace(namespace);
            customWriter.writeLine();

            const classDefinitions: ClassDefinition = {
                name: className,
                accessModifier: 'public',
            };

            customWriter.writeOneLineXmlDocSummary(`Represents ${className} entity. `);
            customWriter.writePublicSealedClass(classDefinitions, () => {
                properties.forEach((property: DomainPrimitiveProperty) => {
                    customWriter.writeOneLineXmlDocSummary(`Represents ${className}'s ${property.name}. `);
                    customWriter.writeAutoProperty({
                        name: property.name,
                        typeName: property.isOptional? `Option<${property.name}>` : property.name,
                        noGetter: false,
                        noSetter: true,
                        accessModifier: 'public',
                    });
                    customWriter.writeLine();
                });

                writeEntityConstructor(customWriter, className, properties);

                customWriter.writeXmlDocParagraph(['TODO: Remember to write tests for businnes logic','TODO: and then if code coverage decreases comment or delete the code not used']);

                customWriter.writeLine();
                writeEntityBuilder(customWriter, className, properties);
            }
            );

        });

};

const writeEntityConstructor = (customWriter: CustomCsharpWriter, className: string, properties: DomainPrimitiveProperty[]) => {
    const parameters: ParameterDefinition[] = [
        { typeName: 'Builder', name: 'builder' },
    ];
    customWriter.writeConstructor('private', className, parameters, null);
    customWriter.writeCodeBlock(() => {
        customWriter.writeLine('Arguments.NotNull(builder, nameof(builder));');

        properties.forEach((property: DomainPrimitiveProperty) => {
            const propertyInitialization = property.isOptional? `builder.${property.name}Option;` : 
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
            customWriter.writeLine(`internal Option<${property.name}> ${property.name}Option { get; private set; }`);
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

const writeWithMethod = (property: DomainPrimitiveProperty, customWriter: CustomCsharpWriter) => {
    const propertyName = property.name.toLowerCase();
    customWriter.writeLine(`public Builder With${property.name}(${property.name} ${_.camelCase(property.name)})`);
    customWriter.writeLine(`    => SetProperty(() => ${property.name}Option = Arguments.NotNull(${propertyName}, nameof(${_.camelCase(property.name)}).SomeNotNull()));`);
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

