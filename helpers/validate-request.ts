import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
} from '../models';
import { ValidationResult } from '../models';

const isEmptyCollection = (properties: DomainPrimitiveProperty[]) =>
  properties.length === 0;

const isNullOrEmpty = (param: string) =>
  param === undefined || param === null || param.length === 0;

export const validateRequest = (
  request: CreateDomainPrimitivesRequest
): ValidationResult => {
  if (isEmptyCollection(request.properties)) {
    return {
      success: false,
      message: 'Domain primitive properties cant be null or empty',
    } as ValidationResult;
  }

  if (
    request.properties.some(
      (property) => isNullOrEmpty(property.name)
    )
  ) {
    return {
      success: false,
      message: 'Property name is required',
    } as ValidationResult;
  }

  if (
    request.properties.some(
      (property) => isNullOrEmpty(property.type)
    )
  ) {
    return {
      success: false,
      message: 'Property type is required',
    } as ValidationResult;
  }

  return { success: true, message: '' } as ValidationResult;
};
