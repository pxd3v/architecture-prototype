import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import UserAuthenticationService from '@shared/infra/services/UserAuthentication/UserAuthenticationService';

const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    const userAuthenticationService = new UserAuthenticationService();

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub } = userAuthenticationService.verifyToken(token, 'segredo');

        request.user = {
            id: sub
        };
        
        return next();
    } catch {
        throw new AppError('Invalid JWT Token.', 401);
    }
};

export default authMiddleware;