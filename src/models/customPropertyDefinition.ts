import { AccessModifier, DefinitionBase } from "@yellicode/csharp";

export interface CustomPropertyDefinition extends DefinitionBase {
    /**
      * The full type name of the property. If the type is a collection,
      * the collection must be part of the name (e.g. 'List<string>').
      */
    typeName: string;
    /**
     * Gets the property's access modifier. By default, no access modifier will be written.
     */
    accessModifier: AccessModifier;

    /**
     * Indicates if the property should be a virtual property.
     */
    isStatic?: boolean;

    /**
     * The default value of the property.
     */
    defaultValue?: string;
}