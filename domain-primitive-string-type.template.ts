import { TextWriter } from '@yellicode/core';
import { ClassDefinition, CSharpWriter } from '@yellicode/csharp';
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

const writeDomainPrimitiveProperty = (
  textWriter: TextWriter,
  className: string,
  entityName: string
) => {
  const classDefinitions: ClassDefinition = {
    name: className,
    implements: ['AbstractStringPrimitive'],
    accessModifier: 'public',
    xmlDocSummary: [`Represents an ${entityName}'s ${className}`],
  };

  const writer = new CSharpWriter(textWriter);
  const customWriter = new CustomCsharpWriter(textWriter);

  writer.writeLine(); // insert a blank line

  customWriter.writeCsharpTenNamespace('Ri.Novus.Core');
  writer.writeLine(); // insert a blank line

  writer.writeClassBlock(classDefinitions, (c) => {
    const errorMessageField: CustomFieldDefinition = {
      name: 'ErrorMessage',
      isStatic: true,
      typeName: 'Message',
      defaultValue: `new("Invalid value or format for ${classDefinitions.name}")`,
      accessModifier: 'private',
    };

    const StringLengthRangeField: CustomFieldDefinition = {
      name: 'StringLengthRange',
      isStatic: true,
      typeName: 'LengthRange',
      defaultValue: '(2, 30).ToLengthRange()',
      accessModifier: 'private',
    };

    customWriter.writeField(errorMessageField);
    customWriter.writeField(StringLengthRangeField);

    customWriter.writeLine();

    customWriter.writeXmlDocSummary([`Shortcut for constructor <see cref="${classDefinitions.name}"/>.`, 
                                      `<param name="${classDefinitions.name.toLowerCase()}">Represents a ${classDefinitions.name.toLowerCase()}.</param>`,
                                      `<returns>An instance of <see cref="${classDefinitions.name}"/></returns>`
                                    ])
    customWriter.writeShortMethodInitialized({name: 'From', returnTypeName: classDefinitions.name})
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

    stringProperties.forEach((property, index) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${className}.cs` },
        (writer: TextWriter) => {
          writer.writeLine(
            `/* This file contains the code for class '${className}'. */`
          );
          writeDomainPrimitiveProperty(writer, className, 'Citizen');
        }
      );
    });
  }
);

const writeDomainPrimitiveEntity = ()=>{
  //TODO: implementar
}

//TODO: ver como usar nodemon para compilar cambios inmediatamente
