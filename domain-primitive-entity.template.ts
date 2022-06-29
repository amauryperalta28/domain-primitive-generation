import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import {
  writeDomainPrimitiveDateProperty,
  writeDomainPrimitiveDecimalProperty,
  writeDomainPrimitiveEntity,
  writeDomainPrimitiveGuidProperty,
  writeDomainPrimitiveIntegerProperty,
  writeDomainPrimitiveStringProperty
} from './src/domainPrimitiveGenerators';
import { PropertyType } from './src/enums/property-types';
import { validateRequest } from './src/helpers/validate-request';
import {
  CreateDomainPrimitivesRequest, DomainPrimitiveProperty
} from './src/models';
import * as fsPromises from 'fs/promises';
import { Entity } from './src/models/create-domain-primitive-request';

const outputDirectory = './result';
let options = { outputFile: `${outputDirectory}/Entity.cs` };

let domainGenerators = new Map<
  string,
  (
    textWriter: TextWriter,
    className: string,
    entityName: string,
    folderName: string
  ) => void
>();

domainGenerators.set(PropertyType.string, writeDomainPrimitiveStringProperty);
domainGenerators.set(PropertyType.guid, writeDomainPrimitiveGuidProperty);
domainGenerators.set(PropertyType.decimal, writeDomainPrimitiveDecimalProperty);
domainGenerators.set(PropertyType.int, writeDomainPrimitiveIntegerProperty);
domainGenerators.set(PropertyType.datetime, writeDomainPrimitiveDateProperty);



Generator.generateFromModel(
  options,
 async (_textWriter: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    await fsPromises.rm(outputDirectory, { recursive: true });

    model.entities.forEach((entity: Entity)=>{
      generateEntityClass(entity);
    })
  }
);

const generateEntityClass = (entity: Entity)=>{
  writeDomainPrimitiveEntity(
    entity.entityName,
    entity.namespace,
    entity.properties
  );

  entity.properties.forEach((property: DomainPrimitiveProperty) => {
    const className = property.name;

    const domainPrimitivePropertyGenerator = domainGenerators.get(property.type);

    Generator.generate(
      { outputFile: `./result/${entity.entityName}/${className}.cs` },
      (writer: TextWriter) => {
        domainPrimitivePropertyGenerator(
          writer,
          className,
          entity.entityName,
          entity.namespace
        );
      }
    );
  });
}
