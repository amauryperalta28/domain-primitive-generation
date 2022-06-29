import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition,
  CSharpWriter,
  ParameterDefinition,
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';

export const writeDomainPrimitiveDecimalProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string,
  namespace: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    inherits: ['ICoreDomainPrimitive<decimal>'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };

  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine(); // insert a blank line

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine(); // insert a blank line

  customWriter.writePublicSealedClass(classDefinitions, (c) => {
    const classNameLower = classDefinitions.name.toLowerCase();

    customWriter.writeXmlDocSummary([
      'As primitive types are inlined by the compiler the coverlet tool does not catch a hit for ',
      'lines `private const decimal MinValue = 0.01M; and MaxValue.',
    ]);

    customWriter.writeLine(
      "#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead."
    );
    customWriter.writeField({
      accessModifier: 'private',
      name: 'MinValue',
      typeName: 'decimal',
      defaultValue: '0.01M',
      isStatic: true,
    });
    customWriter.writeLine();

    customWriter.writeField({
      accessModifier: 'private',
      name: 'MaxValue',
      typeName: 'decimal',
      defaultValue: '99_999',
      isStatic: true,
    });
    customWriter.writeLine();

    customWriter.writeLine(
      "#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead."
    );
    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithParameter({
      name: 'From',
      returnTypeName: className,
    });

    customWriter.writeLine();

    writeConstructorMethod(customWriter, className, entityName);

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

const writeConstructorMethod = (
  customWriter: CustomCsharpWriter,
  className: string,
  entityName: string
) => {
  customWriter.writeLine(`private ${className}(decimal raw${className})`);
  customWriter.writeLine(
    `  => Value = Arguments.Between(raw${className}, MinValue, MaxValue, nameof(raw${className}), "Invalid value or format for ${entityName}'s amount");`
  );
  customWriter.writeLine();
};
