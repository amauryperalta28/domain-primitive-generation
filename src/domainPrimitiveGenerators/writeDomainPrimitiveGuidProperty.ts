import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition,
  CSharpWriter, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';

export const writeDomainPrimitiveGuidProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string,
  folderName: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    implements: ['AbstractGuidBasedIdPrimitive'],
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
    customWriter.writePrivateConstructor(className, parameters, 'base(rawId)');
    customWriter.writeCodeBlock(emptyContentCallback);
    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
      `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
      `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitialized({
      name: 'From',
      returnTypeName: classDefinitions.name,
    });

    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
      `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
      `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithoutParameters(
      {
        name: 'Generate',
        returnTypeName: classDefinitions.name,
      },
      'Guid.NewGuid()'
    );
  });
};
