import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IUserAuthenticationService from '@shared/services/UserAuthentication/IUserAuthenticationService';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserAuthenticationService')
        private userAuthenticationService: IUserAuthenticationService
    ){}

    public async execute({ name, email, password }: ICreateUserDto): Promise<User> {
        
        const hashedPassword = await this.userAuthenticationService.encryptPassword(password, 8);
        
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;