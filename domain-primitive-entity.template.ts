import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { writeDomainPrimitiveEntity, writeDomainPrimitiveStringProperty } from './src/domainPrimitiveGenerators';
import { writeDomainPrimitiveGuidProperty } from './src/domainPrimitiveGenerators/writeDomainPrimitiveGuidProperty';
import { validateRequest } from './src/helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty
} from './src/models';

const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };

Generator.generateFromModel(
  options,
  (textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    writeDomainPrimitiveEntity(
      textWriter,
      model.entityName,
      model.folderName,
      model.properties
    );

    const stringProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'string'
    );

    const guidProperties: DomainPrimitiveProperty[] = model.properties.filter(
      (property) => property.type === 'Guid'
    );

    stringProperties.forEach((property: DomainPrimitiveProperty) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${className}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveStringProperty(
            writer,
            className,
            'User',
            'Users'
          );
        }
      );
    });

    guidProperties.forEach((property: DomainPrimitiveProperty) => {
      const className = property.name;

      Generator.generate(
        { outputFile: `./result/${className}.cs` },
        (writer: TextWriter) => {
          writeDomainPrimitiveGuidProperty(writer, 'Id', 'User', 'Users');
        }
      );
    });
  }
);

