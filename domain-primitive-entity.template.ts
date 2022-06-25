import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { writeDomainPrimitiveDecimalProperty, writeDomainPrimitiveEntity,
         writeDomainPrimitiveGuidProperty, 
         writeDomainPrimitiveStringProperty } from './src/domainPrimitiveGenerators';
import { validateRequest } from './src/helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty
} from './src/models';

const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };

Generator.generateFromModel(
  options,
  (_textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    writeDomainPrimitiveEntity(
      model.entityName,
      model.folderName,
      model.properties
    );

    const stringProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'string'
    );

    const guidProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'guid'
    );

    const decimalProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'decimal'
    );

    stringProperties.forEach((property: DomainPrimitiveProperty) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${model.entityName}/${className}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveStringProperty(
            writer,
            className,
            model.entityName,
            model.folderName
          );
        }
      );
    });

    guidProperties.forEach((property: DomainPrimitiveProperty) => {
      Generator.generate(
        { outputFile: `./result/${model.entityName}/${property.name}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveGuidProperty(writer, property.name, model.entityName, model.folderName);
        }
      );
    });


    decimalProperties.forEach((property: DomainPrimitiveProperty) => {
      Generator.generate(
        { outputFile: `./result/${model.entityName}/${property.name}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveDecimalProperty(writer, property.name, model.entityName, model.folderName);
        }
      );
    });
  }
);

