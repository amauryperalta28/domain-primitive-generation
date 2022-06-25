import { TextWriter } from '@yellicode/core';
import {
    ClassDefinition,
    CSharpWriter, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';

export const writeDomainPrimitiveDecimalProperty = (
    textWriter: TextWriter,
    className: string,
    entityName: string,
    folderName: string
) => {
    const classDefinitions: ClassDefinition = {
        name: className,
        implements: ['ICoreDomainPrimitive<decimal>'],
        accessModifier: 'public',
        xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
    };

    const writer = new CSharpWriter(textWriter);
    const customWriter = new CustomCsharpWriter(textWriter);

    writer.writeLine(); // insert a blank line

    customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
    writer.writeLine(); // insert a blank line

    writer.writeClassBlock(classDefinitions, (c) => {
        const parameters: ParameterDefinition[] = [
            { typeName: 'decimal', name: 'rawAmount' },
        ];

        const classNameLower = classDefinitions.name.toLowerCase();


        customWriter.writeXmlDocSummary(['As primitive types are inlined by the compiler the coverlet tool does not catch a hit for ',
            'lines `private const decimal MinValue = 0.01M; and MaxValue.']);

        customWriter.writeLine("#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.");
        customWriter.writeField({ accessModifier: 'private', name: 'MinValue', typeName: 'decimal', defaultValue: '0.01M', isStatic: true })
        customWriter.writeLine();

        customWriter.writeField({ accessModifier: 'private', name: 'MaxValue', typeName: 'decimal', defaultValue: '99_999', isStatic: true })
        customWriter.writeLine();

        customWriter.writeLine("#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.");
        customWriter.writeLine();

        customWriter.writeXmlDocSummary([
            `Shortcut for constructor <see cref="${className}"/>.`,
            `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
            `<returns>An instance of <see cref="${className}"/></returns>`,
        ]);

        customWriter.writeShortMethodInitialized({
            name: 'From',
            returnTypeName: className,
        });

        customWriter.writeLine();

        customWriter.writeAutoProperty({
            name: 'Value',
            typeName: 'decimal',
            noGetter: false,
            noSetter: true,
            accessModifier: 'public',
            xmlDocSummary: ['Gets property value'],
        });
        customWriter.writeLine();


    });
};
