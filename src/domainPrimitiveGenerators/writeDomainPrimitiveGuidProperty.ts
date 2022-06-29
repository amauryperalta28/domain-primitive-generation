import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition,
  CSharpWriter, ParameterDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';

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
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };

  const emptyContentCallback = () => {};
  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine(); // insert a blank line

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine(); // insert a blank line

  customWriter.writePublicSealedClass(classDefinitions, (c) => {
    const parameters: ParameterDefinition[] = [
      { typeName: 'Guid', name: 'rawId' },
    ];

    const classNameLower = classDefinitions.name.toLowerCase();

    customWriter.writeConstructor('private', className, parameters, 'base(rawId)');
    customWriter.writeCodeBlock(emptyContentCallback);
    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithParameter({
      name: 'From',
      returnTypeName: className,
    });

    customWriter.writeLine();

    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${classNameLower}">Represents a ${classNameLower}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    customWriter.writeShortMethodInitializedWithoutParameters(
      {
        name: 'Generate',
        returnTypeName: className,
      },
      'Guid.NewGuid()'
    );
  });
};
