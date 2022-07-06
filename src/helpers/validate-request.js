"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const property_types_1 = require("../enums/property-types");
const isEmptyCollection = (properties) => properties.length === 0;
const isNullOrEmpty = (param) => param === undefined || param === null || param.length === 0;
const buildFailedValitionResult = (message) => ({
    success: false,
    message,
});
exports.validateRequest = (request) => {
    try {
        if (request === null || request === undefined) {
            return buildFailedValitionResult('Domain primitive request cant be null or undefined');
        }
        validateRequestProperties(request);
    }
    catch (Error) {
        return buildFailedValitionResult(Error.message);
    }
    return { success: true, message: '' };
};
const validateRequestProperties = (request) => {
    const validPropertyTypes = [
        property_types_1.PropertyType.string,
        property_types_1.PropertyType.guid,
        property_types_1.PropertyType.decimal,
        property_types_1.PropertyType.int,
        property_types_1.PropertyType.datetime,
        property_types_1.PropertyType.enum,
    ];
    if (request.entities === null || request.entities === undefined || request.entities.length === 0) {
        throw new Error("Entities can't be null, undefined or empty array");
    }
    request.entities.forEach((entity) => {
        if (isEmptyCollection(entity.properties)) {
            throw new Error('Domain primitive properties cant be null or empty');
        }
        if (entity.properties.some((property) => isNullOrEmpty(property.name))) {
            throw new Error('Property name is required');
        }
        if (entity.properties.some((property) => isNullOrEmpty(property.type))) {
            throw new Error('Property type is required');
        }
        entity.properties.forEach((property) => {
            const isInvalidPropertyType = !validPropertyTypes.some(validPropertyType => validPropertyType == property.type);
            if (isInvalidPropertyType) {
                throw new Error(`${entity.name}'s ${property.name} Property type is invalid`);
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQXVEO0FBTXZELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxVQUFxQyxFQUFFLEVBQUUsQ0FDbEUsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFFMUIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUN0QyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFFOUQsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLEVBQUUsS0FBSztJQUNkLE9BQU87Q0FDUixDQUFDLENBQUM7QUFFVSxRQUFBLGVBQWUsR0FBRyxDQUM3QixPQUFzQyxFQUNwQixFQUFFO0lBQ3BCLElBQUk7UUFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM3QyxPQUFPLHlCQUF5QixDQUM5QixvREFBb0QsQ0FDckQsQ0FBQztTQUNIO1FBRUQseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8seUJBQXlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ3hDLENBQUMsQ0FBQztBQUVGLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxPQUFzQyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxrQkFBa0IsR0FBRztRQUN6Qiw2QkFBWSxDQUFDLE1BQU07UUFDbkIsNkJBQVksQ0FBQyxJQUFJO1FBQ2pCLDZCQUFZLENBQUMsT0FBTztRQUNwQiw2QkFBWSxDQUFDLEdBQUc7UUFDaEIsNkJBQVksQ0FBQyxRQUFRO1FBQ3JCLDZCQUFZLENBQUMsSUFBSTtLQUNsQixDQUFDO0lBRUYsSUFBRyxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7UUFDOUYsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0tBQ3JFO0lBRUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjLEVBQUMsRUFBRTtRQUN6QyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDdEU7UUFFRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQy9GLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFpQyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDL0YsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFpQyxFQUFDLEVBQUU7WUFDN0QsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hILElBQUcscUJBQXFCLEVBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxNQUFNLFFBQVEsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLENBQUM7YUFDL0U7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBR0osQ0FBQyxDQUFDIn0=