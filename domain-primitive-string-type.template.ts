import { TextWriter } from '@yellicode/core';
import {
  AccessModifier,
  ClassDefinition,
  CSharpWriter,
  PropertyDefinition
} from '@yellicode/csharp';
import { Generator } from '@yellicode/templating';
import { CustomCsharpWriter } from './src/customWriters/customCsharpWriter';
import { validateRequest } from './src/helpers/validate-request';
import { CreateDomainPrimitivesRequest } from './src/models';
import { CustomFieldDefinition } from './src/models/customPropertyDefinition';

// Generator.generateFromModel(
//   { outputFile: './result/Entity.cs' },
//   (writer: TextWriter, model: CreateDomainPrimitivesRequest) => {
//     const validationResult = validateRequest(model);

//     if (!validationResult.success) {
//       throw new Error(validationResult.message);
//     }

//     writer.writeLine(
//       `API description of, generated from 'domain-primitives-definition.json' at ${new Date().toISOString()}.`
//     );
//     // List GET paths
//     writer.writeLine();
//     writer.writeLine('my Properties:');
//     for (const property in model.properties) {
//       const value = model.properties[property];

//       writer.writeLineIndented(`public ${value.name} { get; }`);
//       writer.writeLineIndented(value.type);
//     }
//   }
// );

const outputDirectory = './result';
const options = { outputFile: `${outputDirectory}/Entity.cs` };

const buildStringAutoProperty = (
  propertyName: string,
  accessModifier: AccessModifier
): PropertyDefinition => {
  return {
    name: propertyName,
    typeName: 'string',

    accessModifier: accessModifier,
    noGetter: false,
    noSetter: false,
  };
};

Generator.generateFromModel(
  options,
  (textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const writer = new CSharpWriter(textWriter);
    const markdown = new CustomCsharpWriter(textWriter);
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    writer.writeUsingDirectives('System', 'System.Collections.Generic');
    writer.writeLine(); // insert a blank line
    writer.writeNamespaceBlock({ name: 'Ri.Novus.Core' }, () => {
      //Todo: Implementando creacion de clase con sus propiedades
      const classDefinitions: ClassDefinition = {
        name: 'Name',
        implements: ['AbstractStringPrimitive'],
        accessModifier: 'public',
      };

      writer.writeClassBlock(classDefinitions, (c) => {
        const propertyDefinition: CustomFieldDefinition = {
          name: 'ErrorMessage',
          isStatic: true,
          typeName: 'Message',
          defaultValue: 'new("Invalid value or format for citizen names.")',
          accessModifier: 'private'
        };

        const propertyDefinition2: CustomFieldDefinition = {
          name: 'StringLengthRange',
          isStatic: true,
          typeName: 'LengthRange',
          defaultValue: '(2, 30).ToLengthRange()',
          accessModifier: 'private'
        };

        markdown.writeField(propertyDefinition);
        markdown.writeField(propertyDefinition2);
      });
    });
  }
);
