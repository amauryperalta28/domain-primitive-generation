import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition,
  CSharpWriter,
  ParameterDefinition,
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';

export const writeDomainPrimitiveIntegerProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string,
  namespace: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    inherits: ['AbstractPositiveIntegerPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };

  const emptyContentCallback = () => {};

  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeLine();

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine();

  customWriter.writePublicSealedClass(classDefinitions, (c) => {
    const parameters: ParameterDefinition[] = [
      { typeName: 'PositiveInteger', name: 'rawValue' },
    ];

    customWriter.writeField({
      accessModifier: 'private',
      isStatic: true,
      typeName: 'PositiveInteger',
      name: 'MinValue',
      defaultValue: 'new(1)',
    });
    customWriter.writeField({
      accessModifier: 'private',
      isStatic: true,
      typeName: 'PositiveInteger',
      name: 'MinValue',
      defaultValue: 'new(100)',
    });

    customWriter.writeLine();
    customWriter.writeXmlDocSummary([
      `Creates an instance of <see cref="${className}"/>.`,
      `<param name="rawValue"></param>`,
    ]);
    customWriter.writeConstructor(
      'public',
      className,
      parameters,
      'base(rawValue, MinValue, MaxValue)'
    );
    customWriter.writeCodeBlock(emptyContentCallback);
    customWriter.writeLine();

    const classNameLower = classDefinitions.name.toLowerCase();
    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithGivenValue(
      {
        name: 'From',
        returnTypeName: className,
      },
      `new PositiveInteger(${classNameLower})`,
      'int',
    );

    customWriter.writeLine();
  });
};
