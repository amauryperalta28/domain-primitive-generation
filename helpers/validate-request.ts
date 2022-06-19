import { CreateDomainPrimitivesRequest } from '../models';
import { ValidationResult } from '../models';

export const validateRequest =  (request: CreateDomainPrimitivesRequest): ValidationResult => {
    if(request.properties.length === 0){
       return {success: false, message: 'Properties cant be null or empty'} as ValidationResult;
    }

    return {success: true, message: ''} as ValidationResult;
};


