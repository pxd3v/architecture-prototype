import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, 'segredo');

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub
        };
        
        return next();
    } catch {
        throw new AppError('Invalid JWT Token.', 401);
    }
};

export default authMiddleware;