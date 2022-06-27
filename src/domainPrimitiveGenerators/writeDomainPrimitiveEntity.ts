import { TextWriter } from '@yellicode/core';
import { ClassDefinition, ParameterDefinition } from '@yellicode/csharp';
import { Generator } from '@yellicode/templating';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';

export const writeDomainPrimitiveEntity = (
    className: string,
    folderName: string,
    properties: DomainPrimitiveProperty[]
) => {

    Generator.generate(
        { outputFile: `./result/${className}/${className}.cs` },
        (writer: TextWriter) => {
            const customWriter = new CustomCsharpWriter(writer);

            customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
            customWriter.writeLine(); // insert a blank line

            const classDefinitions: ClassDefinition = {
                name: className,
                accessModifier: 'public',
                xmlDocSummary: [`Represents ${className} entity.`],
            };
            customWriter.writeSealedClass(classDefinitions, (c) => {
                properties.forEach((property: DomainPrimitiveProperty) => {
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

                writeEntityConstructor(customWriter, className, properties);

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
            customWriter.writeLine(`${property.name} = builder.${property.name}Option.ValueOrFailure();`);
        })
    });
    customWriter.writeLine();
}

const writeEntityBuilder = (customWriter: CustomCsharpWriter, className: string,
    properties: DomainPrimitiveProperty[]) => {
    const classDefinitions: ClassDefinition = {
        name: 'Builder',
        accessModifier: 'public',
        inherits: ['AbstractEntityBuilder<Domain>'],
        xmlDocSummary: [`${className}'s builder.`],
    };
    customWriter.writeClassBlock(classDefinitions, (c) => {

        customWriter.writeLine('protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();');
        customWriter.writeLine('protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();');

        properties.forEach((property: DomainPrimitiveProperty) => {
            customWriter.writeLine(`internal Option<${property.name}> ${property.name}Option { get; private set; }`);
            customWriter.writeLine();

        });

        customWriter.writeLine('private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);');
        customWriter.writeLine();

        writeDoBuild(className, customWriter, properties);

        properties.forEach((property: DomainPrimitiveProperty) => {
            writeWithMethod(property.name, customWriter);
        });
    });
}

const writeWithMethod = (className: string, customWriter: CustomCsharpWriter) => {
    const propertyName = className.toLowerCase();
    customWriter.writeLine(`public Builder With${className}(${className} ${propertyName})`);
    customWriter.writeLine(`    => SetProperty(() => ${className}Option = Arguments.NotNull(${propertyName}, nameof(${propertyName}).SomeNotNull()));`);
    customWriter.writeLine();
}

const writeDoBuild = (className: string, customWriter: CustomCsharpWriter, properties: DomainPrimitiveProperty[]) => {
    customWriter.writeLine(`protected override ${className} DoBuild()`);
    customWriter.writeCodeBlock(() => {
        properties.forEach((property) => {
            customWriter.writeLine(`State.IsTrue(${property.name.toLowerCase()}Option.HasValue, "${className}'s ${property.name} is missing");`)

        })

        customWriter.writeLine(`return new ${className}(this);`)
    });

    customWriter.writeLine();
}

