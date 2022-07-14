import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';
import _ = require('lodash');

export const writeDomainPrimitiveIntegerProperty = (
  textWriter: TextWriter,
  property: DomainPrimitiveProperty,
  entityName: string,
  namespace: string
) => {
  const className = property.name;
  
  const classDefinitions: ClassDefinition = {
    name: property.name,
    inherits: ['AbstractPositiveIntegerPrimitive'],
    accessModifier: 'public',
  };

  const emptyContentCallback = () => { /* To have an empty constructor block */ };

  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine();

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine();

  customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}`);
  customWriter.writePublicSealedClass(classDefinitions, () => {
    const parameters: ParameterDefinition[] = [
      { typeName: 'PositiveInteger', name: 'rawValue' },
    ];

    customWriter.writeField({
      accessModifier: 'private',
      isStatic: true,
      typeName: 'PositiveInteger',
      name: 'MinValue',
      defaultValue: property.min ? `new(${property.min})` : 'new(1)',
    });
    customWriter.writeField({
      accessModifier: 'private',
      isStatic: true,
      typeName: 'PositiveInteger',
      name: 'MinValue',
      defaultValue: property.max ? `new(${property.max})`: 'new(100)',
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

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="raw${className}">Represents a ${_.camelCase(className)}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    const isReadOnly = false;
    customWriter.writeShortMethodInitializedWithGivenValue(
      {
        name: 'From',
        returnTypeName: className,
        accessModifier: 'public',
        isStatic: true
      },
      `new PositiveInteger(raw${className})`,
      'int',
      isReadOnly
    );

    customWriter.writeLine();
  });
};
