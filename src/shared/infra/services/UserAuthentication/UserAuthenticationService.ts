import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import IUserAuthenticationService, { TokenPayload } from '@shared/services/UserAuthentication/IUserAuthenticationService';



export default class UserAuthenticationService implements IUserAuthenticationService {
    public async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await compare(password, encryptedPassword);
    }

    public generateToken(data: any, secret: string, config: any): string {
        return sign(data, secret, config);
    }
    
    public verifyToken(token: string, secret: string): TokenPayload{
        const decodeToken = verify(token, secret);
        const { iat, exp, sub } = decodeToken as TokenPayload;
        return { iat, exp, sub};
    }
    public async encryptPassword(password: string, n: number): Promise<string>{
        return await hash(password, n);
    }
}