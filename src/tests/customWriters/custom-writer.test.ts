import { CodeWriter, TextWriter } from '@yellicode/core';
import { mock } from 'jest-mock-extended';
import { CustomCsharpWriter } from '../../customWriters/customCsharpWriter';
import { CustomPropertyDefinition } from '../../models/customPropertyDefinition';

/*
writeStaticReadonlyProperty
writePublicStaticMethodReturningProperty
*/

describe('Custom-writer.ts tests', () => {
  test('When call writeField private static with initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const propertyName = 'ErrorMessage';
    const initialValue  = 'new("Invalid value or format for citizen names.")';

    const expected = `private static readonly ${typeName} ${propertyName} = ${initialValue};`

    const propertyDefinition: CustomPropertyDefinition = {
      name: propertyName,
      isStatic: true,
      typeName: typeName,
      defaultValue: initialValue,
      accessModifier:'private'
    };
    customWriter.writeField(propertyDefinition);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);

  });

  test('When call writeField private not static with initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const propertyName = 'ErrorMessage';
    const initialValue  = 'new("Invalid value or format for citizen names.")';

    const expected = `private readonly ${typeName} ${propertyName} = ${initialValue};`

    const propertyDefinition: CustomPropertyDefinition = {
      name: propertyName,
      isStatic: false,
      typeName: typeName,
      defaultValue: initialValue,
      accessModifier:'private'
    };
    customWriter.writeField(propertyDefinition);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);

  });

  test('When call writeField without initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const propertyName = 'ErrorMessage';

    const expected = `private static readonly ${typeName} ${propertyName} ;`
    const propertyDefinition: CustomPropertyDefinition = {
      name: propertyName,
      isStatic: true,
      typeName: typeName,
      accessModifier:'private'
    };

    customWriter.writeField(propertyDefinition);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);

  });
});
