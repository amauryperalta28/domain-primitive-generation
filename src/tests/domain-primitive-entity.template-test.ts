import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import * as fsPromises from 'fs/promises';
import {
  writeDomainPrimitiveDateProperty,
  writeDomainPrimitiveDecimalProperty,
  writeDomainPrimitiveEntity,
  writeDomainPrimitiveGuidProperty,
  writeDomainPrimitiveIntegerProperty,
  writeDomainPrimitiveStringProperty
} from '../domainPrimitiveGenerators';
import { PropertyType } from '../enums/property-types';
import { validateRequest } from '../helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
  Entity
} from '../models';

const outputDirectory = './domainPrimitiveGenerators/templateTestResult';
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

domainPrimitiveGenerators.set(PropertyType.string, writeDomainPrimitiveStringProperty);
domainPrimitiveGenerators.set(PropertyType.guid, writeDomainPrimitiveGuidProperty);
domainPrimitiveGenerators.set(PropertyType.decimal, writeDomainPrimitiveDecimalProperty);
domainPrimitiveGenerators.set(PropertyType.int, writeDomainPrimitiveIntegerProperty);
domainPrimitiveGenerators.set(PropertyType.dateTime, writeDomainPrimitiveDateProperty);

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
    entity,
    './domainPrimitiveGenerators/templateTestResult'
  );

  entity.properties.forEach((property: DomainPrimitiveProperty) => {
    const className = property.name;

    const domainPrimitivePropertyGenerator = domainPrimitiveGenerators.get(
      property.type
    );

    if (domainPrimitiveGenerators.has(property.type)) {
      Generator.generate(
        {
          outputFile: `./domainPrimitiveGenerators/templateTestResult/${entity.name}/${className}.cs`,
        },
        (writer: TextWriter) => {
          domainPrimitivePropertyGenerator(
            writer,
            property,
            entity.name,
            entity.namespace
          );
        }
      );

    }

  });
};
