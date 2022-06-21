import { validateRequest } from '../../helpers/validate-request';
import { CreateDomainPrimitivesRequest, ValidationResult, DomainPrimitiveProperty } from '../../models';

/*

  When property is null, empty or whitespace should fail
*/

describe('request-validator.ts tests', () => {

  test('When create domain primitive request is null or undefined should fail', () => {
    const request = null;

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: 'Domain primitive request cant be null or undefined',
    };

    expect(actual).toEqual(expected);
  });

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

  test.each([
    { propertyName: '', condition:'empty string'},
    {propertyName: undefined, condition:'undefined'},
    {propertyName:null, condition:'null'},
  ])('When properties collection has properties $condition should fail', ({propertyName}) => {
    const properties: DomainPrimitiveProperty[] = [
      { name: propertyName, type: 'string'}
    ]

    const request: CreateDomainPrimitivesRequest = {
      properties: properties,
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: 'Property name is required',
    };

    expect(actual).toEqual(expected);
  });

  test.each([
    { propertyType: '', condition:'empty string'},
    {propertyType: undefined, condition:'undefined'},
    {propertyType:null, condition:'null'},
  ])('When properties collection has properties with type $condition should fail', ({propertyType}) => {
    const properties: DomainPrimitiveProperty[] = [
      { name: 'Name', type: propertyType}
    ]

    const request: CreateDomainPrimitivesRequest = {
      properties: properties,
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: 'Property type is required',
    };

    expect(actual).toEqual(expected);
  });

});
