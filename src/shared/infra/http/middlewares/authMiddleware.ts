import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import JWTAuthenticationService from '@shared/infra/services/JWTAuthenticationService/JWTAuthenticationService';
const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    const jwtAuthenticationService = new JWTAuthenticationService();

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub } = jwtAuthenticationService.verifyToken(token, 'segredo');

        request.user = {
            id: sub
        };
        
        return next();
    } catch {
        throw new AppError('Invalid JWT Token.', 401);
    }
};

export default authMiddleware;