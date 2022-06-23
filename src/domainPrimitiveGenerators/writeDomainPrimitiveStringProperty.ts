import { TextWriter } from '@yellicode/core';
import { ClassDefinition, CSharpWriter } from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { CustomFieldDefinition } from '../models/customPropertyDefinition';

export const writeDomainPrimitiveStringProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string,
  folderName: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    implements: ['AbstractStringPrimitive'],
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
    const errorMessageField: CustomFieldDefinition = {
      name: 'ErrorMessage',
      isStatic: true,
      typeName: 'Message',
      defaultValue: `new("Invalid value or format for ${classDefinitions.name}")`,
      accessModifier: 'private',
    };

    customWriter.writeXmlDocParagraph([
      'Represents the Description minimum length restriction.',
    ]);
    customWriter.writePublicFieldConst('MinLength', 'int', minLength);
    customWriter.writeLine();

    customWriter.writeXmlDocParagraph([
      'Represents the Description max length restriction.',
    ]);
    customWriter.writePublicFieldConst('MaxLength', 'int', maxLength);
    customWriter.writeLine();

    customWriter.writeField(errorMessageField);

    
    const StringLengthRangeField: CustomFieldDefinition = {
        name: 'StringLengthRange',
        isStatic: true,
        typeName: 'LengthRange',
        defaultValue: `(MinLength, MaxLength).ToLengthRange()`,
        accessModifier: 'private',
      };
    customWriter.writeField(StringLengthRangeField);

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
  });
};
