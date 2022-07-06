import { CodeWriter } from '@yellicode/core';
import {
  ClassDefinition, MethodDefinition,
  ParameterDefinition
} from '@yellicode/csharp';
import { mock } from 'jest-mock-extended';
import { CustomCsharpWriter } from '../../customWriters/customCsharpWriter';
import { CustomFieldDefinition } from '../../models/customPropertyDefinition';

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
      accessModifier: 'public',
      isStatic: true
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
      accessModifier: 'public',
      isStatic: true
    };

    const defaultValue = 'Guid.NewGuid()';

    customWriter.writeShortMethodInitializedWithoutParameters(
      methodDefinition,
      defaultValue
    );
    const expected = `public static readonly ${typeName} ${methodDefinition.name}() => new(${defaultValue});`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writeShortMethodInitializedWithGivenValue is called should write correct method', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'EventId';

    const methodDefinition: MethodDefinition = {
      name: 'From',
      returnTypeName: typeName,
      accessModifier: 'public',
      isStatic: true
    };

    const defaultValue = `(new PositiveInteger(${typeName.toLowerCase()}))`;
    const paramType = 'int';
    customWriter.writeShortMethodInitializedWithGivenValue(
      methodDefinition,
      defaultValue,
      paramType
    );
    const expected = `public static readonly ${typeName} ${
      methodDefinition.name
    }(${paramType} raw${typeName}) => new(${defaultValue});`;

    expect(myWriter.writeLine).toHaveBeenCalledWith(expected);
  });

  test('When writePublicFieldConst with default value should write correct field', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);

    const typeName = 'int';
    const name = 'MinLength';
    const defaultValue = '8';

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

  test('When writePublicSealedClass is called only with class name should write correct class', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);
    const className = 'User';

    const ClassDefinition: ClassDefinition = {
      name: className,
    };

    customWriter.writePublicSealedClass(ClassDefinition, () => {});
    expect(myWriter.writeLine).toHaveBeenCalledWith(
      `public sealed class ${className} `
    );
    expect(myWriter.writeLine).toHaveBeenCalledWith('{');
    expect(myWriter.writeLine).toHaveBeenCalledWith('}');
  });

  test('When writePublicSealedClass is called only with class name implement 3 interfaces should write correct class', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);
    const className = 'User';

    const ClassDefinition: ClassDefinition = {
      name: className,
      inherits:['interfaz1, interfaz2', 'interfaz3']
    };

    customWriter.writePublicSealedClass(ClassDefinition, () => {});
    expect(myWriter.writeLine).toHaveBeenCalledWith(
      `public sealed class ${className} : interfaz1, interfaz2, interfaz3`
    );
    expect(myWriter.writeLine).toHaveBeenCalledWith(`{`);
    expect(myWriter.writeLine).toHaveBeenCalledWith(`}`);
  });

  test('When writePublicSealedClass is called only with class name implement 3 interfaces should write correct class with documentation', () => {
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);
    const className = 'User';
    const documentation = 'This is a documentation';

    const ClassDefinition: ClassDefinition = {
      name: className,
      xmlDocSummary: [documentation]
    };

    customWriter.writePublicSealedClass(ClassDefinition, () => {});

    expect(myWriter.writeLine).toHaveBeenCalledWith( '/// <summary>');
    expect(myWriter.writeLine).toHaveBeenCalledWith( '/// This is a documentation');
    expect(myWriter.writeLine).toHaveBeenCalledWith( '/// </summary>');
    expect(myWriter.writeLine).toHaveBeenCalledWith( '{');
    expect(myWriter.writeLine).toHaveBeenLastCalledWith( '}');
  });

  test('When writeOneLineXmlDocSummary is called should write correct summary documentation', () => { 
    const myWriter = mock<CodeWriter>();
    const customWriter = new CustomCsharpWriter(myWriter);
    const text = 'This is a documentation';

    const expectedDocumentation = `///<summary>${text}</summary>`
    customWriter.writeOneLineXmlDocSummary(text);

    expect(myWriter.writeLine).toHaveBeenLastCalledWith(expectedDocumentation);
   })
});
