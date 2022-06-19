import { validateRequest } from '../helpers/validate-request';
import { CreateDomainPrimitivesRequest, ValidationResult } from '../models';

describe('request-validator.ts tests', () => {
  test('When properties collection is empty should fail', () => {
    const request: CreateDomainPrimitivesRequest = {
      properties: [],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: 'Domain primitive properties cant be null or empty',
    };

    expect(actual).toEqual(expected);
  });

  test('When properties collection has properties should succeed', () => {
    const request: CreateDomainPrimitivesRequest = {
      properties: [{ name: 'Name', type: 'string'}],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: true,
      message: '',
    };

    expect(actual).toEqual(expected);
  });
});
