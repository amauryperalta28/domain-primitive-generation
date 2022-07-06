import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';

export const writeDomainPrimitiveDateProperty = (
  textWriter: TextWriter,
  property: DomainPrimitiveProperty,
  entityName: string,
  namespace: string
) => {
  const className = property.name;
  
  const classDefinitions: ClassDefinition = {
    name: className,
    inherits: ['AbstractPastOrPresentTimestampPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents ${entityName}'s ${className}`],
  };

  const emptyContentCallback = () => {};

  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine();

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine();

  customWriter.writePublicSealedClass(classDefinitions, (c) => {
    const parameters: ParameterDefinition[] = [
      { typeName: 'PastOrPresentTimestamp', name: 'date' },
    ];

    customWriter.writeConstructor(
      'private',
      className,
      parameters,
      'base(date)'
    );
    customWriter.writeCodeBlock(emptyContentCallback);
    customWriter.writeLine();

    const classNameLower = classDefinitions.name.toLowerCase();
    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="raw${className}">Represents a ${classNameLower}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithGivenValue(
      {
        name: 'From',
        returnTypeName: className,
        accessModifier: 'public',
        isStatic: true
      },
      `new PastOrPresentTimestamp(raw${className})`,
      'DateTimeOffset'
    );

    customWriter.writeLine();
  });
};
