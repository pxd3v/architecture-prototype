import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import ValidationError from '@shared/errors/ValidationError';

const createUserServiceValidator = async ( request: Request, response: Response, next: NextFunction ): Promise<void> => {
    const bodySchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
    });
    
    try {
        Joi.assert(request.body, bodySchema);
        next();
    } catch(err) {
        throw new ValidationError(err.details[0].message);
    }
};

export default createUserServiceValidator;