import { CreateDomainPrimitivesRequest } from '../models';
import { ValidationResult } from '../models';

export const validateRequest =  (request: CreateDomainPrimitivesRequest): ValidationResult => {
    if(request.properties.length === 0){
       return {success: false, message: 'Domain primitive properties cant be null or empty'} as ValidationResult;
    }

    if(request.properties.some(property => property.name === undefined || property.name.length === 0)){
        return {success: false, message: 'Property name is required'} as ValidationResult;
    }

    return {success: true, message: ''} as ValidationResult;
};


