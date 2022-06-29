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
                throw new Error(`${property.name} Property type is invalid`);
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQXVEO0FBT3ZELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxVQUFxQyxFQUFFLEVBQUUsQ0FDbEUsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFFMUIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUN0QyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFFOUQsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLEVBQUUsS0FBSztJQUNkLE9BQU87Q0FDUixDQUFDLENBQUM7QUFFVSxRQUFBLGVBQWUsR0FBRyxDQUM3QixPQUFzQyxFQUNwQixFQUFFO0lBQ3BCLElBQUk7UUFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM3QyxPQUFPLHlCQUF5QixDQUM5QixvREFBb0QsQ0FDckQsQ0FBQztTQUNIO1FBRUQseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8seUJBQXlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ3hDLENBQUMsQ0FBQztBQUVGLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxPQUFzQyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxrQkFBa0IsR0FBRztRQUN6Qiw2QkFBWSxDQUFDLE1BQU07UUFDbkIsNkJBQVksQ0FBQyxJQUFJO1FBQ2pCLDZCQUFZLENBQUMsT0FBTztRQUNwQiw2QkFBWSxDQUFDLEdBQUc7UUFDaEIsNkJBQVksQ0FBQyxRQUFRO0tBQ3RCLENBQUM7SUFFRixPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFO1FBQ2pDLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUN0RTtRQUVELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUN0RSxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDdEUsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUMsRUFBRTtZQUNwQyxNQUFNLHFCQUFxQixHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEgsSUFBRyxxQkFBcUIsRUFBQztnQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBR0osQ0FBQyxDQUFDIn0=