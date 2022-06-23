import { TextWriter } from '@yellicode/core';
import { ClassDefinition, CSharpWriter } from '@yellicode/csharp';
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

  const minLength = 1;
  const maxLength = 100;

  const writer = new CSharpWriter(textWriter);
  const customWriter = new CustomCsharpWriter(textWriter);

  writer.writeLine(); // insert a blank line

  customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
  writer.writeLine(); // insert a blank line

  writer.writeClassBlock(classDefinitions, (c) => {

    customWriter.writeXmlDocParagraph([
      'Represents the Description minimum length restriction.',
    ]);

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
      `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
      `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`,
    ]);
    customWriter.writeShortMethodInitialized({
      name: 'From',
      returnTypeName: classDefinitions.name,
    });

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${classDefinitions.name}"/>.`,
      `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
      `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`,
    ]);
    customWriter.writeShortMethodInitializedWithoutParameters({
      name: 'Generate',
      returnTypeName: classDefinitions.name,
    }, 'Guid.NewGuid()');
  });
};
