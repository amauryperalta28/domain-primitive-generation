import { PropertyType } from '../enums/property-types';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty, Entity, ValidationResult
} from '../models';

const isEmptyCollection = (properties: DomainPrimitiveProperty[]) =>
  properties.length === 0;

const isNullOrEmpty = (param: string) =>
  param === undefined || param === null || param.length === 0;

const buildFailedValitionResult = (message: string) => ({
  success: false,
  message,
});

export const validateRequest = (
  request: CreateDomainPrimitivesRequest
): ValidationResult => {
  try {
    if (request === null || request === undefined) {
      return buildFailedValitionResult(
        'Domain primitive request cant be null or undefined'
      );
    }

    validateRequestProperties(request);
  } catch (Error) {
    return buildFailedValitionResult(Error.message);
  }

  return { success: true, message: '' };
};

const validateRequestProperties = (request: CreateDomainPrimitivesRequest) => {
  const validPropertyTypes = [
    PropertyType.string,
    PropertyType.guid,
    PropertyType.decimal,
    PropertyType.int,
    PropertyType.datetime,
  ];

  if(request.entities === null || request.entities === undefined || request.entities.length === 0){
    throw new Error("Entities can't be null, undefined or empty array");
  }

  request.entities.forEach((entity: Entity)=>{
    if (isEmptyCollection(entity.properties)) {
      throw new Error('Domain primitive properties cant be null or empty');
    }
  
    if (entity.properties.some((property: DomainPrimitiveProperty) => isNullOrEmpty(property.name))) {
      throw new Error('Property name is required');
    }
  
    if (entity.properties.some((property: DomainPrimitiveProperty) => isNullOrEmpty(property.type))) {
      throw new Error('Property type is required');
    }
  
    entity.properties.forEach((property: DomainPrimitiveProperty)=>{
      const isInvalidPropertyType = !validPropertyTypes.some(validPropertyType => validPropertyType == property.type);
      if(isInvalidPropertyType){
        throw new Error(`${entity.name}'s ${property.name} Property type is invalid`);
      }
    })
  })


};
