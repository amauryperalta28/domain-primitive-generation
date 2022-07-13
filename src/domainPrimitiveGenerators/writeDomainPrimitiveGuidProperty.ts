import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';
import _ = require('lodash');

export const writeDomainPrimitiveGuidProperty = (
  textWriter: TextWriter,
  property: DomainPrimitiveProperty,
  entityName: string,
  namespace: string
) => {
  const className = property.name;
  
  const classDefinitions: ClassDefinition = {
    name: className,
    inherits: ['AbstractGuidBasedIdPrimitive'],
    accessModifier: 'public',
  };

  const emptyContentCallback = () => {};
  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine();

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine();

  customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}. `);
  customWriter.writePublicSealedClass(classDefinitions, (c) => {
    const parameters: ParameterDefinition[] = [
      { typeName: 'Guid', name: 'rawId' },
    ];

    customWriter.writeConstructor('private', className, parameters, 'base(rawId)');
    customWriter.writeCodeBlock(emptyContentCallback);
    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="raw${className}">Represents a ${_.camelCase(className)}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithGivenValue({
      name: 'From',
      returnTypeName: className,
      accessModifier: 'public',
      isStatic: true

    },
    `raw${className}`,
    'Guid',
    false
    );

    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithoutParameters(
      {
        name: 'Generate',
        returnTypeName: className,
        accessModifier: 'public',
        isStatic: true
      },
      'Guid.NewGuid()',
      false
    );
  });
};
