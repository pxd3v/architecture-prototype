import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default class JWTAuthenticationService {
    public generateToken(data: any, secret: string, config: any): string {
        return sign(data, secret, config);
    }
    
    public verifyToken(token: string, secret: string): TokenPayload{
        const decodeToken = verify(token, secret);
        const { iat, exp, sub } = decodeToken as TokenPayload;
        return { iat, exp, sub};
    }
}