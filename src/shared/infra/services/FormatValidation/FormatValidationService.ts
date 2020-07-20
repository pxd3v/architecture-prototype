import { validate } from 'validate.js';
import IFormatValidator from '@shared/services/FormatValidation/IFormatValidationService';
import ValidationError from '@shared/errors/ValidationError';

export default class FormatValidator implements IFormatValidator {
    public validate(data: any, schema: any): void {
        const result = validate(data, schema);
        if(result){
            const errorsMatrix: string[][] = Object.values(result);
            const errorMessages = errorsMatrix.reduce((acc, val) => acc.concat(val), []);
            if(errorMessages.length > 0)
                throw new ValidationError(errorMessages);
        }
    }
}