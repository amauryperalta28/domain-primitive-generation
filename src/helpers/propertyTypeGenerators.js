"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_types_1 = require("../enums/property-types");
let domainPrimitivePropertyTypeGenerators = new Map();
const generalAutoPropertyTypeGenerator = (property) => {
    return property.isOptional ? `Option<${property.name}>` : property.name;
};
const booleanAutoPropertyTypeGenerator = (property) => 'bool';
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.string, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.guid, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.decimal, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.int, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.datetime, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.enum, generalAutoPropertyTypeGenerator);
domainPrimitivePropertyTypeGenerators.set(property_types_1.PropertyType.boolean, booleanAutoPropertyTypeGenerator);
exports.default = domainPrimitivePropertyTypeGenerators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlUeXBlR2VuZXJhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5VHlwZUdlbmVyYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFBdUQ7QUFHdkQsSUFBSSxxQ0FBcUMsR0FBRyxJQUFJLEdBQUcsRUFNaEQsQ0FBQztBQUVKLE1BQU0sZ0NBQWdDLEdBQUcsQ0FBQyxRQUFpQyxFQUFVLEVBQUU7SUFDcEYsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUMzRSxDQUFDLENBQUE7QUFFRCxNQUFNLGdDQUFnQyxHQUFHLENBQUMsUUFBaUMsRUFBVSxFQUFFLENBQUMsTUFBTSxDQUFBO0FBRTlGLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLE1BQU0sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ2pHLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLElBQUksRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQy9GLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ2xHLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLEdBQUcsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzlGLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLFFBQVEsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ25HLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLElBQUksRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQy9GLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyw2QkFBWSxDQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWxHLGtCQUFlLHFDQUFxQyxDQUFDIn0=