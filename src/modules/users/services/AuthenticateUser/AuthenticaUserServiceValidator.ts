import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAuthenticateUserDto from '@modules/users/dtos/IAuthenticateUserDto';
import IFormatValidationService from '@shared/services/FormatValidation/IFormatValidationService';
import IValidator from '@shared/validation/IValidation';

@injectable()
class AuthenticateUserServiceValidator implements IValidator<IAuthenticateUserDto>{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('FormatValidator')
        private formatValidator: IFormatValidationService
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
        
        this.formatValidator.validate({ email, password }, schema);
    }
}

export default AuthenticateUserServiceValidator;