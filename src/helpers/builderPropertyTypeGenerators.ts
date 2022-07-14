import { PropertyType } from "../enums/property-types";
import { DomainPrimitiveProperty } from "../models";

let builderPropertyTypeGenerators = new Map<
    string,
    (
        property: DomainPrimitiveProperty,

    ) => string
>();

const generalAutoPropertyTypeGenerator = (property: DomainPrimitiveProperty): string => {
   return `internal Option<${property.name}> ${property.name}Option { get; private set; }`;
}

const booleanAutoPropertyTypeGenerator = (property: DomainPrimitiveProperty): string => {
    return `internal Option<bool> ${property.name}Option { get; private set; }`;
 }

builderPropertyTypeGenerators.set(PropertyType.string, generalAutoPropertyTypeGenerator);
builderPropertyTypeGenerators.set(PropertyType.guid, generalAutoPropertyTypeGenerator);
builderPropertyTypeGenerators.set(PropertyType.decimal, generalAutoPropertyTypeGenerator);
builderPropertyTypeGenerators.set(PropertyType.int, generalAutoPropertyTypeGenerator);
builderPropertyTypeGenerators.set(PropertyType.dateTime, generalAutoPropertyTypeGenerator);
builderPropertyTypeGenerators.set(PropertyType.enum, generalAutoPropertyTypeGenerator);
builderPropertyTypeGenerators.set(PropertyType.boolean, booleanAutoPropertyTypeGenerator);

export default builderPropertyTypeGenerators;