import {
  CSharpWriter,
  MethodDefinition,
  ParameterDefinition,
} from '@yellicode/csharp';
import { CustomFieldDefinition } from '../models/customPropertyDefinition';
import { AccessModifier, ClassDefinition } from '@yellicode/csharp';

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

  public writeShortMethodInitializedWithParameter(method: MethodDefinition): void {
    const typeName = method.returnTypeName;
    const lowerCasePropertyName = typeName.toLowerCase();
    this.writeLine(
      `public static readonly ${typeName} ${method.name}(string ${lowerCasePropertyName}) => new(${lowerCasePropertyName});`
    );
  }

  public writeShortMethodInitializedWithGivenValue(method: MethodDefinition, defaultValue: string): void {
    const typeName = method.returnTypeName;
    const lowerCasePropertyName = typeName.toLowerCase();
    this.writeLine(
      `public static readonly ${typeName} ${method.name}(string ${lowerCasePropertyName}) => new(${defaultValue});`
    );
  }

  public writeShortMethodInitializedWithoutParameters(
    method: MethodDefinition,
    defaultValue: string
  ): void {
    const typeName = method.returnTypeName;
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

  public writeConstructor(
    accessModifier: AccessModifier,
    name: string,
    parameters: ParameterDefinition[],
    baseMethodImplementation: string = undefined
  ) {
    let params = this.getStringParameters(parameters);

    const baseImplementation = baseMethodImplementation ? `: ${baseMethodImplementation}` : '';
    const result = `${accessModifier} ${name}(${params}) ${baseImplementation}`;
    this.writeLine(result.trim());
  }

  private getStringParameters(parameters: ParameterDefinition[]): string {
    let params = '';


    for (let index = 0; index < parameters.length; index++) {
      const parameter = parameters[index];

      if (index == parameters.length - 1) {
        params += `${parameter.typeName} ${parameter.name}`;
      } else {
        params += `${parameter.typeName} ${parameter.name}, `;
      }
    }

    return params;
  }

  public writeSealedClass(classDefinition : ClassDefinition, contents: (writer: CSharpWriter) => void){
    if(classDefinition.xmlDocSummary != undefined){
      this.writeXmlDocSummary(classDefinition.xmlDocSummary);
    }

    this.writeLine(`public sealed class ${classDefinition.name} `);

    if(classDefinition.inherits != undefined){
      const inherits = classDefinition.inherits.reduce((x, y) => x + ',' + y );
      this.writeLine(`: ${inherits}`);
    }

    this.writeCodeBlock(contents);
  }

}
