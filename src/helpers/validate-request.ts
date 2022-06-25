import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
} from '../models';
import { ValidationResult } from '../models';

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
  if (isEmptyCollection(request.properties)) {
    throw new Error('Domain primitive properties cant be null or empty');
  }

  if (request.properties.some((property) => isNullOrEmpty(property.name))) {
    throw new Error('Property name is required');
  }

  if (request.properties.some((property) => isNullOrEmpty(property.type))) {
    throw new Error('Property type is required');
  }

  //TODO: Validate property type to be correct string or Guid
};
