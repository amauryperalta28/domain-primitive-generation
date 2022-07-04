import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import {
  writeDomainPrimitiveDateProperty,
  writeDomainPrimitiveDecimalProperty,
  writeDomainPrimitiveEntity,
  writeDomainPrimitiveGuidProperty,
  writeDomainPrimitiveIntegerProperty,
  writeDomainPrimitiveStringProperty,
} from './src/domainPrimitiveGenerators';
import { PropertyType } from './src/enums/property-types';
import { validateRequest } from './src/helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
  Entity,
} from './src/models';
import * as fsPromises from 'fs/promises';

const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };

let domainPrimitiveGenerators = new Map<
  string,
  (
    textWriter: TextWriter,
    property: DomainPrimitiveProperty,
    entityName: string,
    folderName: string
  ) => void
>();

domainPrimitiveGenerators.set(
  PropertyType.string,
  writeDomainPrimitiveStringProperty
);
domainPrimitiveGenerators.set(
  PropertyType.guid,
  writeDomainPrimitiveGuidProperty
);
domainPrimitiveGenerators.set(
  PropertyType.decimal,
  writeDomainPrimitiveDecimalProperty
);
domainPrimitiveGenerators.set(
  PropertyType.int,
  writeDomainPrimitiveIntegerProperty
);
domainPrimitiveGenerators.set(
  PropertyType.datetime,
  writeDomainPrimitiveDateProperty
);

Generator.generateFromModel(
  options,
  async (_textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    await fsPromises.rm(outputDirectory, { recursive: true });

    model.entities.forEach((entity: Entity) => {
      generateEntityClass(entity);
    });
  }
);

const generateEntityClass = (entity: Entity) => {
  writeDomainPrimitiveEntity(
    entity.name,
    entity.namespace,
    entity.properties,
    outputDirectory
  );

  entity.properties.forEach((property: DomainPrimitiveProperty) => {
    const className = property.name;

    const domainPrimitivePropertyGenerator = domainPrimitiveGenerators.get(
      property.type
    );

    Generator.generate(
      { outputFile: `${outputDirectory}/${entity.name}/${className}.cs` },
      (writer: TextWriter) => {
        domainPrimitivePropertyGenerator(
          writer,
          property,
          entity.name,
          entity.namespace
        );
      }
    );
  });
};
