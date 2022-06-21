import { CodeWriter, TextWriter } from '@yellicode/core';
import { mock } from 'jest-mock-extended';
import { CustomCsharpWriter } from '../../customWriters/customCsharpWriter';

/*
writeStaticReadonlyProperty
writePublicStaticMethodReturningProperty
*/

describe('Custom-writer.ts tests', () => {
  test('When call writeStaticReadonlyProperty with initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const propertyName = 'ErrorMessage';
    const initialValue  = 'new("Invalid value or format for citizen names.")';

    const expected = `private static readonly ${typeName} ${propertyName} = ${initialValue};`

    customWriter.writeStaticReadonlyProperty(typeName, propertyName, initialValue);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);

  });

  test('When call writeStaticReadonlyProperty without initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const propertyName = 'ErrorMessage';

    const expected = `private static readonly ${typeName} ${propertyName} ;`

    customWriter.writeStaticReadonlyProperty(typeName, propertyName);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);

  });
});
