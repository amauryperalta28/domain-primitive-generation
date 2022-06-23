import { CodeWriter, TextWriter } from '@yellicode/core';
import { MethodDefinition } from '@yellicode/csharp';
import { mock } from 'jest-mock-extended';
import { CustomCsharpWriter } from '../../customWriters/customCsharpWriter';
import { CustomFieldDefinition as CustomFieldDefinition } from '../../models/customPropertyDefinition';

/*
writePublicStaticMethodReturningProperty
*/

describe('Custom-writer.ts tests', () => {
  test('When call writeField private static with initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const fieldName = 'ErrorMessage';
    const initialValue = 'new("Invalid value or format for citizen names.")';

    const expected = `private static readonly ${typeName} ${fieldName} = ${initialValue};`;

    const fieldDefinition: CustomFieldDefinition = {
      name: fieldName,
      isStatic: true,
      typeName: typeName,
      defaultValue: initialValue,
      accessModifier: 'private',
    };
    customWriter.writeField(fieldDefinition);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When call writeField private not static with initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const fieldName = 'ErrorMessage';
    const initialValue = 'new("Invalid value or format for citizen names.")';

    const expected = `private readonly ${typeName} ${fieldName} = ${initialValue};`;

    const fieldDefinition: CustomFieldDefinition = {
      name: fieldName,
      isStatic: false,
      typeName: typeName,
      defaultValue: initialValue,
      accessModifier: 'private',
    };
    customWriter.writeField(fieldDefinition);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When call writeField without initial value should return correct property', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Message';
    const fieldName = 'ErrorMessage';

    const expected = `private static readonly ${typeName} ${fieldName} ;`;
    const fieldDefinition: CustomFieldDefinition = {
      name: fieldName,
      isStatic: true,
      typeName: typeName,
      accessModifier: 'private',
    };

    customWriter.writeField(fieldDefinition);

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writeCsharpTenNamespace is called should write correct namespace', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);
    const namespace = 'Ri.Novus';

    customWriter.writeCsharpTenNamespace(namespace);
    const expected = `namespace ${namespace};`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writeShortMethodInitialized is called should write correct method', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Names';

    const methodDefinition: MethodDefinition = {
      name: 'From',
      returnTypeName: typeName,
    };
    customWriter.writeShortMethodInitialized(methodDefinition);
    const expected = `public static readonly ${typeName} From(string ${typeName.toLowerCase()}) => new(${typeName.toLowerCase()});`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writePublicFieldConst with default value should write correct field', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'int';
    const name = 'MinLength';
    const defaultValue = 8;

    customWriter.writePublicFieldConst(name, typeName, defaultValue);
    const expected = `public const ${typeName} ${name} = ${defaultValue};`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writePublicFieldConst with default value should write correct field', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'int';
    const name = 'MinLength';
    const defaultValue = 0;

    customWriter.writePublicFieldConst(name, typeName);
    const expected = `public const ${typeName} ${name} = ${defaultValue};`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

});
