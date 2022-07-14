import { validateRequest } from '../../helpers/validate-request';
import {
  CreateDomainPrimitivesRequest,
  DomainPrimitiveProperty,
  ValidationResult,
} from '../../models';

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
      entities: [{ properties: [], name: 'Name', namespace: 'Users' }],
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
      entities: [
        {
          properties: [{ name: 'Name', type: 'string', isOptional: false }],
          name: 'Name',
          namespace: 'Users',
        },
      ],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: true,
      message: '',
    };

    expect(actual).toEqual(expected);
  });

  test.each([
    { propertyName: '', condition: 'empty string' },
    { propertyName: undefined, condition: 'undefined' },
    { propertyName: null, condition: 'null' },
  ])(
    'When properties collection has properties $condition should fail',
    ({ propertyName }) => {
      const properties: DomainPrimitiveProperty[] = [
        { name: propertyName, type: 'string', isOptional: false },
      ];

      const request: CreateDomainPrimitivesRequest = {
        entities: [
          { properties: properties, name: 'Name', namespace: 'Users' },
        ],
      };

      const actual: ValidationResult = validateRequest(request);

      const expected = {
        success: false,
        message: 'Property name is required',
      };

      expect(actual).toEqual(expected);
    }
  );

  test.each([
    { propertyType: '', condition: 'empty string' },
    { propertyType: undefined, condition: 'undefined' },
    { propertyType: null, condition: 'null' },
  ])(
    'When properties collection has properties with type $condition should fail',
    ({ propertyType }) => {
      const properties: DomainPrimitiveProperty[] = [
        { name: 'Name', type: propertyType, isOptional: false },
      ];

      const request: CreateDomainPrimitivesRequest = {
        entities: [
          { properties: properties, name: 'Name', namespace: 'Users' },
        ],
      };

      const actual: ValidationResult = validateRequest(request);

      const expected = {
        success: false,
        message: 'Property type is required',
      };

      expect(actual).toEqual(expected);
    }
  );

  test('When property type is invalid should fail', () => {
    const properties: DomainPrimitiveProperty[] = [
      { name: 'Name', type: 'string', isOptional: false },
      { name: 'Lastnames', type: 'unknown', isOptional: false },
    ];

    const entityName = 'Employee';

    const request: CreateDomainPrimitivesRequest = {
      entities: [
        { properties: properties, name: entityName, namespace: 'Users' },
      ],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: `${entityName}'s Lastnames Property type is invalid`,
    };

    expect(actual).toEqual(expected);
  });

  test.each([
    [null],
    [undefined],
    [[]],
  ])('When entities is null, undefined or empty array should fail', (actualEntities) => {
    const request: CreateDomainPrimitivesRequest = {
      entities: actualEntities,
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: "Entities can't be null, undefined or empty array",
    };

    expect(actual).toEqual(expected);
  });

  test('When namespace is empty should fail', () => {
    const request: CreateDomainPrimitivesRequest = {
      entities: [
        {
          properties: [{ name: 'Name', type: 'string', isOptional: false }],
          name: 'Name',
          namespace: 'Users',
        },
      ],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: true,
      message: '',
    };

    expect(actual).toEqual(expected);
  });

  test.each([
    [null],
    [undefined],
    [''],
  ])('When namespace is null, undefined or empty should fail', (namespace) => {
    const request: CreateDomainPrimitivesRequest = {
      entities: [
        {
          properties: [{ name: 'Name', type: 'string', isOptional: false }],
          name: 'Name',
          namespace: namespace,
        },
      ],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: 'Entity Namespace cant be null, undefined or empty',
    };

    expect(actual).toEqual(expected);
  });

  test.each([
    [null],
    [undefined],
    [''],
  ])('When entity name is null, undefined or empty should fail', (name) => {
    const request: CreateDomainPrimitivesRequest = {
      entities: [
        {
          properties: [{ name: 'Name', type: 'string', isOptional: false }],
          name: name,
          namespace: 'Users',
        },
      ],
    };

    const actual: ValidationResult = validateRequest(request);

    const expected = {
      success: false,
      message: 'Entity Name cant be null, undefined or empty',
    };

    expect(actual).toEqual(expected);
  });
});
