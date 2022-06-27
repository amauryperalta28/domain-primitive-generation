import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition,
  CSharpWriter, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';

export const writeDomainPrimitiveIntegerProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string,
  folderName: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    implements: ['AbstractPositiveIntegerPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };

  const emptyContentCallback = () => {};

  const writer = new CSharpWriter(textWriter);
  const customWriter = new CustomCsharpWriter(textWriter);

  writer.writeLine(); // insert a blank line

  customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
  writer.writeLine(); // insert a blank line

  writer.writeClassBlock(classDefinitions, (c) => {
    const parameters: ParameterDefinition[] = [
      { typeName: 'Guid', name: 'rawId' },
    ];

    const classNameLower = classDefinitions.name.toLowerCase();

    customWriter.writeConstructor(className, parameters, 'base(rawId)');
    customWriter.writeCodeBlock(emptyContentCallback);
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

  });
};
