import {
  AccessModifier, ClassDefinition, CSharpWriter,
  MethodDefinition,
  ParameterDefinition
} from '@yellicode/csharp';
import { CustomFieldDefinition } from '../models';
var _ = require('lodash');

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

  public writeShortMethodInitializedWithParameter(method: MethodDefinition, isReadOnly: boolean = true): void {

    const typeName = method.returnTypeName;
    const camelCasePropertyName =  _.camelCase(typeName);
    let result = '';

    if(method.accessModifier){
      result += `${method.accessModifier}`;
    }

    if(method.isStatic){
      result += ' static'
    }

    if(isReadOnly){
      result += ' readonly'
    }

    this.writeLine(
      `${result} ${typeName} ${method.name}(string ${camelCasePropertyName}) => new(${camelCasePropertyName});`
    );
  }

  public writeShortMethodInitializedWithGivenValue(method: MethodDefinition, defaultValue: string, paramType: string, isReadOnly: boolean = true): void {
    const typeName = method.returnTypeName;
    
    let result = '';

    if(method.accessModifier){
      result += `${method.accessModifier}`;
    }

    if(method.isStatic){
      result += ' static'
    }

    if(isReadOnly){
      result += ' readonly'
    }
    
    this.writeLine(
      `${result} ${typeName} ${method.name}(${paramType} raw${typeName}) => new(${defaultValue});`
    );
  }

  public writeShortMethodInitializedWithoutParameters(
    method: MethodDefinition,
    defaultValue: string,
    isReadOnly: boolean = true
  ): void {
    const typeName = method.returnTypeName;
    let result = '';

    if(method.accessModifier){
      result += `${method.accessModifier}`;
    }

    if(method.isStatic){
      result += ' static'
    }

    if(isReadOnly){
      result += ' readonly'
    }
    

    this.writeLine(
      `${result} ${typeName} ${method.name}() => new(${defaultValue});`
    );
  }

  public writePublicFieldConst(
    name: string,
    typeName: string,
    defaultValue: string = '0'
  ): void {
    this.writeLine(`public const ${typeName} ${name} = ${defaultValue};`);
  }

  public writeConstructor(
    accessModifier: AccessModifier,
    name: string,
    parameters: ParameterDefinition[],
    baseMethodImplementation: string = undefined
  ): void  {
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

  public writePublicSealedClass(classDefinition : ClassDefinition, contents: (writer: CSharpWriter) => void): void {
    if(classDefinition.xmlDocSummary != undefined){
      this.writeXmlDocSummary(classDefinition.xmlDocSummary);
    }

    let classHeader = `public sealed class ${classDefinition.name} `

    if(classDefinition.inherits != undefined){
      const inherits = classDefinition.inherits.reduce((currentInherit, nextInherit) => currentInherit + ', ' + nextInherit );
      classHeader += `: ${inherits}`;
    }

    this.writeLine(classHeader);

    this.writeCodeBlock(contents);
  }

}
