"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
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
    if (isEmptyCollection(request.properties)) {
        throw new Error('Domain primitive properties cant be null or empty');
    }
    if (request.properties.some((property) => isNullOrEmpty(property.name))) {
        throw new Error('Property name is required');
    }
    if (request.properties.some((property) => isNullOrEmpty(property.type))) {
        throw new Error('Property type is required');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFVBQXFDLEVBQUUsRUFBRSxDQUNsRSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUUxQixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ3RDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUU5RCxNQUFNLHlCQUF5QixHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTztDQUNSLENBQUMsQ0FBQztBQUVVLFFBQUEsZUFBZSxHQUFHLENBQzdCLE9BQXNDLEVBQ3BCLEVBQUU7SUFDcEIsSUFBSTtRQUNGLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzdDLE9BQU8seUJBQXlCLENBQzlCLG9EQUFvRCxDQUNyRCxDQUFDO1NBQ0g7UUFFRCx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakQ7SUFFRCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBRUYsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLE9BQXNDLEVBQUUsRUFBRTtJQUMzRSxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDdEU7SUFFRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDdkUsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUM5QztBQUdILENBQUMsQ0FBQyJ9