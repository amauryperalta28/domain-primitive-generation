import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition,
  CSharpWriter
} from '@yellicode/csharp';
import { Generator } from '@yellicode/templating';
import { CustomCsharpWriter } from './src/customWriters/customCsharpWriter';
import { validateRequest } from './src/helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty
} from './src/models';
import { CustomFieldDefinition } from './src/models/customPropertyDefinition';

const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };

const writeDomainPrimitiveClass = (
  textWriter: TextWriter,
  className: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    implements: ['AbstractStringPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: ["Represents an entity's description"],
  };

  const writer = new CSharpWriter(textWriter);
  const customWriter = new CustomCsharpWriter(textWriter);

  // writer.writeUsingDirectives('System', 'System.Collections.Generic');
  writer.writeLine(); // insert a blank line

  customWriter.writeCsharpTenNamespace('Ri.Novus.Core');
  writer.writeLine(); // insert a blank line

  writer.writeClassBlock(classDefinitions, (c) => {
    const propertyDefinition: CustomFieldDefinition = {
      name: 'ErrorMessage',
      isStatic: true,
      typeName: 'Message',
      defaultValue: `new("Invalid value or format for ${classDefinitions.name}")`,
      accessModifier: 'private',
    };

    const propertyDefinition2: CustomFieldDefinition = {
      name: 'StringLengthRange',
      isStatic: true,
      typeName: 'LengthRange',
      defaultValue: '(2, 30).ToLengthRange()',
      accessModifier: 'private',
    };

    customWriter.writeField(propertyDefinition);
    customWriter.writeField(propertyDefinition2);
  });
};

Generator.generateFromModel(
  options,
  (textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    const stringProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'string'
    );

    // options = { outputFile: `${outputDirectory}/Entity.cs` };

    stringProperties.forEach((property, index) => {
      options = { outputFile: `${outputDirectory}/${property.name}.cs` };
      const className = property.name;
      writeDomainPrimitiveClass(textWriter, className);
    });
  }
);

//TODO: Lograr generar un archivo por clase
