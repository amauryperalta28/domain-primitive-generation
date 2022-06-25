import { TextWriter } from '@yellicode/core';
import { ClassDefinition } from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { CustomFieldDefinition } from '../models/customPropertyDefinition';

//TODO: Take min and max from json model

export const writeDomainPrimitiveStringProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string,
  folderName: string
) => {
  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeCsharpTenNamespace(`Ri.Novus.Core.${folderName}`);
  customWriter.writeLine(); // insert a blank line

  const classDefinitions: ClassDefinition = {
    name: className,
    implements: ['AbstractStringPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };
  customWriter.writeClassBlock(classDefinitions, (c) => {
    const errorMessageField: CustomFieldDefinition = {
      name: 'ErrorMessage',
      isStatic: true,
      typeName: 'Message',
      defaultValue: `new("Invalid value or format for ${className}")`,
      accessModifier: 'private',
    };

    customWriter.writeXmlDocParagraph([
      'Represents the Description minimum length restriction.',
    ]);
    const minLength = 1;
    customWriter.writePublicFieldConst('MinLength', 'int', minLength);
    customWriter.writeLine();

    customWriter.writeXmlDocParagraph([
      'Represents the Description max length restriction.',
    ]);

    const maxLength = 100;
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
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${className.toLowerCase()}">Represents a ${className.toLowerCase()}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);
    customWriter.writeShortMethodInitialized({
      name: 'From',
      returnTypeName: className,
    });
  });
};