import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
} from '../models';
import { ValidationResult } from '../models';

const isEmptyCollection = (properties: DomainPrimitiveProperty[]) =>
  properties.length === 0;

const isNullOrEmpty = (param: string) =>
  param === undefined || param === null || param.length === 0;

const buildFailedValitionResult = (message: string) => {
  return { success: false, message };
};

export const validateRequest = (
  request: CreateDomainPrimitivesRequest
): ValidationResult => {
  if (request === null || request === undefined) {
    return buildFailedValitionResult(
      'Domain primitive request cant be null or undefined'
    );
  }

  if (isEmptyCollection(request.properties)) {
    return buildFailedValitionResult(
      'Domain primitive properties cant be null or empty'
    );
  }

  if (request.properties.some((property) => isNullOrEmpty(property.name))) {
    return buildFailedValitionResult(
        'Property name is required'
      );
  }

  if (request.properties.some((property) => isNullOrEmpty(property.type))) {
    return buildFailedValitionResult(
        'Property type is required'
      );
  }

  return { success: true, message: '' };
};
