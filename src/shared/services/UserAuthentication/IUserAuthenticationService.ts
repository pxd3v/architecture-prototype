export interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default interface IUserAuthenticationService {
    comparePassword: (password: string, encryptedPassword: string) => Promise<boolean>;
    generateToken: (data: any, secret: string, config: any) => string;
    verifyToken: (token: string, secret: string) => TokenPayload;
    encryptPassword: (password: string, n: number) => Promise<string>;
};