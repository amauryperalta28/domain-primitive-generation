import { TextWriter } from '@yellicode/core';
import { ClassDefinition, ParameterDefinition } from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';
import { CustomFieldDefinition } from '../models/customPropertyDefinition';
import _ = require('lodash');

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
  };

  customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}`);
  customWriter.writePublicSealedClass(classDefinitions, () => {
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
    customWriter.writePublicFieldConst(
      'MinLength',
      'int',
      minLength.toString()
    );
    customWriter.writeLine();

    customWriter.writeXmlDocParagraph([
      'Represents the Description max length restriction.',
    ]);

    const maxLength = property.max ? property.max : 100;
    customWriter.writePublicFieldConst(
      'MaxLength',
      'int',
      maxLength.toString()
    );
    customWriter.writeLine();

    customWriter.writeField(errorMessageField);

    const StringLengthRangeField: CustomFieldDefinition = {
      name: 'LengthRange',
      isStatic: true,
      typeName: 'StringLengthRange',
      defaultValue: `(MinLength, MaxLength).ToLengthRange()`,
      accessModifier: 'private',
    };
    customWriter.writeField(StringLengthRangeField);

    customWriter.writeLine();

    if (property.regex) {
      customWriter.writePublicFieldConst(
        'ValidPattern',
        'string',
        `@"${property.regex}"`
      );
      customWriter.writeLine();
    }

    
    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${_.camelCase(className)}">Represents a ${_.camelCase(className)}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    const isReadOnly = false;

    customWriter.writeShortMethodInitializedWithParameter({
      name: 'From',
      returnTypeName: className,
      accessModifier: 'public',
      isStatic: true
    }, isReadOnly);

    const parameters: ParameterDefinition[] = [
      { typeName: 'string', name: `raw${className}` },
    ];

    customWriter.writeConstructor(
      'private',
      className,
      parameters,
      getConstructorBaseImplementation(property)
    );
    customWriter.writeCodeBlock(() => { /* To have an empty constructor block */ });
  });
};

const getConstructorBaseImplementation = (
  property: DomainPrimitiveProperty
): string => {
  if (property.regex) {
    return `base(raw${property.name}, LengthRange, ValidPattern, ErrorMessage)`;
  } else {
    return `base(raw${property.name}, LengthRange, ErrorMessage)`;
  }
};
