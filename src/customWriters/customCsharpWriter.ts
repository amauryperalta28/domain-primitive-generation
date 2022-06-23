import { CSharpWriter, MethodDefinition } from '@yellicode/csharp';
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
}
