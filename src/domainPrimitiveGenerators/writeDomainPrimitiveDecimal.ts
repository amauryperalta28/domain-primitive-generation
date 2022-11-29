import { TextWriter } from '@yellicode/core';
import {
  ClassDefinition
} from '@yellicode/csharp';
import { CustomCsharpWriter } from '../customWriters/customCsharpWriter';
import { DomainPrimitiveProperty } from '../models';
import _ = require('lodash');

export const writeDomainPrimitiveDecimalProperty = (
  textWriter: TextWriter,
  property: DomainPrimitiveProperty,
  entityName: string,
  namespace: string
) => {
  const className = property.name;
  
  const classDefinitions: ClassDefinition = {
    name: className,
    inherits: ['ICoreDomainPrimitive<decimal>'],
    accessModifier: 'public',
  };

  const customWriter = new CustomCsharpWriter(textWriter);

  customWriter.writeUsingDirectives('Wepsys.Core');
  customWriter.writeLine();

  customWriter.writeCsharpTenNamespace(namespace);
  customWriter.writeLine();

  customWriter.writeOneLineXmlDocSummary(`Represents ${entityName}'s ${className}`);
  customWriter.writePublicSealedClass(classDefinitions, () => {

    customWriter.writeXmlDocSummary([
      'As primitive types are inlined by the compiler the coverlet tool does not catch a hit for ',
      'lines `private const decimal MinValue = 0.01M; and MaxValue.',
    ]);

    customWriter.writeLine(
      "#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead."
    );
    customWriter.writeField({
      accessModifier: 'private',
      name: 'MinValue',
      typeName: 'decimal',
      defaultValue: property.min ? `${property.min}M`: '0.01M',
      isStatic: true,
    });
    customWriter.writeLine();

    customWriter.writeField({
      accessModifier: 'private',
      name: 'MaxValue',
      typeName: 'decimal',
      defaultValue: property.max ? `${property.max}M` :'99_999M',
      isStatic: true,
    });
    customWriter.writeLine();

    customWriter.writeLine(
      "#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead."
    );
    customWriter.writeLine();

    
    customWriter.writeXmlDocSummary([
      `Shortcut for constructor <see cref="${className}"/>.`,
      `<param name="${_.camelCase(className)}">Represents a ${_.camelCase(className)}.</param>`,
      `<returns>An instance of <see cref="${className}"/></returns>`,
    ]);

    const isReadOnly = false;

    //TODO: Fix template decimal
    // customWriter.writeShortMethodInitializedWithParameter({
    //   name: 'From',
    //   returnTypeName: className,
    //   accessModifier: 'public',
    //   isStatic: true
    // }, isReadOnly);
    
    customWriter.writeShortMethodInitializedWithGivenValue(
      {
        name: 'From',
        returnTypeName: className,
        accessModifier: 'public',
        isStatic: true
      },
      `raw${className}`,
      'decimal',
      isReadOnly
    );

    customWriter.writeLine();

    writeConstructorMethod(customWriter, className, entityName);

    customWriter.writeAutoProperty({
      name: 'Value',
      typeName: 'decimal',
      noGetter: false,
      noSetter: true,
      accessModifier: 'public',
      xmlDocSummary: ['Gets property value'],
    });
    customWriter.writeLine();
  });
};

const writeConstructorMethod = (
  customWriter: CustomCsharpWriter,
  className: string,
  entityName: string
) => {
  customWriter.writeLine(`private ${className}(decimal raw${className})`);
  customWriter.writeLine(
    `  => Value = Arguments.Between(raw${className}, MinValue, MaxValue, nameof(raw${className}), "Invalid value or format for ${entityName}'s ${className}");`
  );
  customWriter.writeLine();
};
