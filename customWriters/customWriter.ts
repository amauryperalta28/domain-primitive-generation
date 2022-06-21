import { CodeWriter } from "@yellicode/core";

export class CustomWriter extends CodeWriter {
    
    public writeStaticReadonlyProperty( typeName: string, propertyName: string, initialValue: string): void{
        this.writeLine(`private static readonly ${typeName} ${propertyName} = ${initialValue};`);
    }

    public writePublicStaticMethodReturningProperty(typeName: string): void{
        const lowerCasePropertyName = typeName.toLowerCase();
        this.writeLine(`public static readonly ${typeName} From(string ${lowerCasePropertyName}) => new(${lowerCasePropertyName});`);
    }

    // public writeCsharpTenNamespace(namespace: string): void {
    //    this.writeLine(`${namespace};`);
    // }
   
}    