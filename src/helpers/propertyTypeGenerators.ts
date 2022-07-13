import { PropertyType } from "../enums/property-types";
import { DomainPrimitiveProperty } from "../models";

let domainPrimitivePropertyTypeGenerators = new Map<
    string,
    (
        property: DomainPrimitiveProperty,

    ) => string
>();

const generalAutoPropertyTypeGenerator = (property: DomainPrimitiveProperty): string => {
   return property.isOptional ? `Option<${property.name}>` : property.name;
}

const booleanAutoPropertyTypeGenerator = (_property: DomainPrimitiveProperty): string => 'bool'

domainPrimitivePropertyTypeGenerators.set(PropertyType.string, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(PropertyType.guid, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(PropertyType.decimal, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(PropertyType.int, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(PropertyType.datetime, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(PropertyType.enum, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(PropertyType.boolean, booleanAutoPropertyTypeGenerator);

export default domainPrimitivePropertyTypeGenerators;