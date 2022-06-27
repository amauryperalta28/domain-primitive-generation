import { CodeWriter, TextWriter } from '@yellicode/core';
import { MethodDefinition, ParameterDefinition } from '@yellicode/csharp';
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
    customWriter.writeShortMethodInitializedWithParameter(methodDefinition);
    const expected = `public static readonly ${typeName} From(string ${typeName.toLowerCase()}) => new(${typeName.toLowerCase()});`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writeShortMethodInitializedWithoutParameters is called should write correct method', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'Id';

    const methodDefinition: MethodDefinition = {
      name: 'Generate',
      returnTypeName: typeName,
    };

    const defaultValue = 'Guid.NewGuid()';

    customWriter.writeShortMethodInitializedWithoutParameters(
      methodDefinition,
      defaultValue
    );
    const expected = `public static readonly ${typeName} ${methodDefinition.name}() => new(${defaultValue});`;

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

  test('When writeConstructor with default value should write correct field', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const name = 'Id';
    const parameters: ParameterDefinition[] = [
      { typeName: 'Guid', name: 'rawId' },
    ];

    customWriter.writeConstructor('private', name, parameters, 'base(rawId)');
    const expected = `private ${name}(Guid rawId) : base(rawId)`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writeConstructor with default value and multiple parameters should write correct field', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const name = 'Id';
    const parameters: ParameterDefinition[] = [
      { typeName: 'Guid', name: 'rawId' },
      { typeName: 'string', name: 'rawName' },
    ];

    customWriter.writeConstructor('private', name, parameters, 'base(rawId)');
    const expected = `private ${name}(Guid rawId, string rawName) : base(rawId)`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writeConstructor without default value and multiple parameters should write correct field', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const name = 'Id';
    const parameters: ParameterDefinition[] = [
      { typeName: 'Guid', name: 'rawId' },
      { typeName: 'string', name: 'rawName' },
    ];

    customWriter.writeConstructor('private', name, parameters);
    const expected = `private ${name}(Guid rawId, string rawName)`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });
});
