import { CodeWriter } from '@yellicode/core';

export class CustomCsharpWriter extends CodeWriter {
  public writeStaticReadonlyProperty(
    typeName: string,
    propertyName: string,
    initialValue: string = ''
  ): void {
    const value = initialValue.length === 0 ? ';' : `= ${initialValue};`;

    const propertyResult = `private static readonly ${typeName} ${propertyName} ${value}`;

    this.writeLine(propertyResult);
  }
}
