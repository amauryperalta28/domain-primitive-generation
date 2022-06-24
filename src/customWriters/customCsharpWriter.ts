import {
  CSharpWriter,
  MethodDefinition,
  ParameterDefinition,
} from '@yellicode/csharp';
import { CustomFieldDefinition } from '../models/customPropertyDefinition';

export class CustomCsharpWriter extends CSharpWriter {
  public writeField(propertyDefinition: CustomFieldDefinition): void {
    const value = !propertyDefinition.defaultValue
      ? ';'
      : `= ${propertyDefinition.defaultValue};`;
    const accessModifier = propertyDefinition.accessModifier;
    const staticIdentifier = propertyDefinition.isStatic ? ' static ' : ' ';

    const propertyResult = `${accessModifier}${staticIdentifier}readonly ${propertyDefinition.typeName} ${propertyDefinition.name} ${value}`;

    this.writeLine(propertyResult);
  }

  public writeCsharpTenNamespace(namespace: string): void {
    this.writeLine(`namespace ${namespace};`);
  }

  public writeShortMethodInitialized(method: MethodDefinition): void {
    const typeName = method.returnTypeName;
    const lowerCasePropertyName = typeName.toLowerCase();
    this.writeLine(
      `public static readonly ${typeName} ${method.name}(string ${lowerCasePropertyName}) => new(${lowerCasePropertyName});`
    );
  }

  public writeShortMethodInitializedWithoutParameters(
    method: MethodDefinition,
    defaultValue: string
  ): void {
    const typeName = method.returnTypeName;
    const lowerCasePropertyName = typeName.toLowerCase();
    this.writeLine(
      `public static readonly ${typeName} ${method.name}() => new(${defaultValue});`
    );
  }

  public writePublicFieldConst(
    name: string,
    typeName: string,
    defaultValue: number = 0
  ): void {
    this.writeLine(`public const ${typeName} ${name} = ${defaultValue};`);
  }

  public writePrivateConstructor(
    name: string,
    parameters: ParameterDefinition[],
    baseMethodImplementation: string
  ) {
    let params = this.getStringParameters(parameters);

    const baseImplementation = baseMethodImplementation ? `: ${baseMethodImplementation}` : '';

    this.writeLine(`private ${name}(${params}) ${baseImplementation}`);
  }

  private getStringParameters(parameters: ParameterDefinition[]): string {
    let params = '';


    for (let index = 0; index < parameters.length; index++) {
      const parameter = parameters[index];

      if (index == parameters.length - 1) {
        params = `${parameter.typeName} ${parameter.name}`;
      } else {
        params = `${parameter.typeName} ${parameter.name},`;
      }
    }

    return params;
  }
}
