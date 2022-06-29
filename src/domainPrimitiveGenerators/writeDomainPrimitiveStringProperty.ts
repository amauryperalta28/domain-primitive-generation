import { TextWriter } from '@yellicode/core';
import { ClassDefinition } from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';
import { CustomFieldDefinition } from '../models/customPropertyDefinition';

//TODO: Take min and max from json model

export const writeDomainPrimitiveStringProperty = (
  textWriter: TextWriter,
  property: DomainPrimitiveProperty,
  entityName: string,
  namespace: string
) => {
  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine(); 

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine();
  const className = property.name;
  
  const classDefinitions: ClassDefinition = {
    name: className,
    inherits: ['AbstractStringPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };
  customWriter.writePublicSealedClass(classDefinitions, (c) => {
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
    const minLength = property.min ? property.min : 1;
    customWriter.writePublicFieldConst('MinLength', 'int', minLength);
    customWriter.writeLine();

    customWriter.writeXmlDocParagraph([
      'Represents the Description max length restriction.',
    ]);

    const maxLength = property.max ? property.max : 100;
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
    customWriter.writeShortMethodInitializedWithParameter({
      name: 'From',
      returnTypeName: className,
    });
  });
};
