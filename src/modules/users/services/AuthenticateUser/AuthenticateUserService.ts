/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import JWTAuthenticationService from '@shared/infra/services/JWTAuthenticationService/JWTAuthenticationService';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string;
}

@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('JWTAuthenticationService')
        private jwtAuthenticationService: JWTAuthenticationService
    ){}
    
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        
        const passwordMatches = await this.hashProvider.compareHash(password, user!.password);
        
        if(!passwordMatches) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const lastLoginDate = await this.usersRepository.updateLastLoginDate(user!.id, new Date());
        
        const token = this.jwtAuthenticationService.generateToken({  }, 'segredo', {
            subject: user!.id,
            expiresIn: '3d'
        });

        return {
            user: { ...user!, last_login_date: lastLoginDate },
            token
        };
    }
}

export default AuthenticateUserService;