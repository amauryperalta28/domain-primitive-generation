import { CodeWriter } from '@yellicode/core';
import { CustomPropertyDefinition } from '../models/customPropertyDefinition';

export class CustomCsharpWriter extends CodeWriter {
  public writeField(propertyDefinition: CustomPropertyDefinition): void {
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
}
