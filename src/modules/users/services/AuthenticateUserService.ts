import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

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
    ){}
    
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatches = await compare(password, user.password);
        
        if(!passwordMatches) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const lastLoginDate = await this.usersRepository.updateLastLoginDate(user.id, new Date());
        
        const token = sign({  }, 'segredo', {
            subject: user.id,
            expiresIn: '3d'
        });

        return {
            user: { ...user, last_login_date: lastLoginDate },
            token
        };
    }
}

export default AuthenticateUserService;