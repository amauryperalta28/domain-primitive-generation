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
    ];
    if (isEmptyCollection(request.properties)) {
        throw new Error('Domain primitive properties cant be null or empty');
    }
    if (request.properties.some((property) => isNullOrEmpty(property.name))) {
        throw new Error('Property name is required');
    }
    if (request.properties.some((property) => isNullOrEmpty(property.type))) {
        throw new Error('Property type is required');
    }
    request.properties.forEach((property) => {
        const isInvalidPropertyType = !validPropertyTypes.some(validPropertyType => validPropertyType == property.type);
        if (isInvalidPropertyType) {
            throw new Error(`${property.name} Property type is invalid`);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQXVEO0FBT3ZELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxVQUFxQyxFQUFFLEVBQUUsQ0FDbEUsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFFMUIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUN0QyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFFOUQsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLEVBQUUsS0FBSztJQUNkLE9BQU87Q0FDUixDQUFDLENBQUM7QUFFVSxRQUFBLGVBQWUsR0FBRyxDQUM3QixPQUFzQyxFQUNwQixFQUFFO0lBQ3BCLElBQUk7UUFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM3QyxPQUFPLHlCQUF5QixDQUM5QixvREFBb0QsQ0FDckQsQ0FBQztTQUNIO1FBRUQseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8seUJBQXlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ3hDLENBQUMsQ0FBQztBQUVGLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxPQUFzQyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxrQkFBa0IsR0FBRztRQUN6Qiw2QkFBWSxDQUFDLE1BQU07UUFDbkIsNkJBQVksQ0FBQyxJQUFJO1FBQ2pCLDZCQUFZLENBQUMsT0FBTztRQUNwQiw2QkFBWSxDQUFDLEdBQUc7UUFDaEIsNkJBQVksQ0FBQyxRQUFRO0tBQ3RCLENBQUM7SUFFRixJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDdEU7SUFFRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDdkUsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFDLEVBQUU7UUFDckMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hILElBQUcscUJBQXFCLEVBQUM7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyJ9