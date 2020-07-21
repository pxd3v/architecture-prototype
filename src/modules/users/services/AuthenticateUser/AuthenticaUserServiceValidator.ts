import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAuthenticateUserDto from '@modules/users/dtos/IAuthenticateUserDto';
import ValidateJsService from '@shared/infra/services/ValidateJsService/ValidateJsService';
import IValidator from '@shared/models/IValidator';

@injectable()
class AuthenticateUserServiceValidator implements IValidator<IAuthenticateUserDto>{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('ValidateJsService')
        private validateJsService: ValidateJsService
    ){}

    public async execute({ email, password}: IAuthenticateUserDto): Promise<void> {
        await this.validateFormat({ email, password });
        await this.validate({ email, password });
    }

    public async validate({ email }: IAuthenticateUserDto): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }
    }

    public async validateFormat({ email, password }: IAuthenticateUserDto): Promise<void> {
        const schema = {
            email: {
                presence: true,
                email: true,
                type: 'string'
            },
            password: {
                presence: true,
                type: 'string'
            }
        };
        
        this.validateJsService.validate({ email, password }, schema);
    }
}

export default AuthenticateUserServiceValidator;