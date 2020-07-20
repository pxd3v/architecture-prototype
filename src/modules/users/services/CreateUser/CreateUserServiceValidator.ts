import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFormatValidationService from '@shared/services/FormatValidation/IFormatValidationService';
import IValidator from '@shared/validation/IValidation';

@injectable()
class CreateUserServiceValidator implements IValidator<ICreateUserDto>{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('FormatValidator')
        private formatValidator: IFormatValidationService
    ){}

    public async execute({ name, email, password}: ICreateUserDto): Promise<void> {
        await this.validateFormat({ name, email, password});
        await this.validate({name, email, password});
    }

    public async validate({ email }: ICreateUserDto): Promise<void> {
        const checkIfUserExist = await this.usersRepository.findByEmail(email);
        
        if(checkIfUserExist) {
            throw new AppError('Email address already used.');
        }
    }

    public async validateFormat({ name, email, password }: ICreateUserDto): Promise<void> {
        const schema = {
            name: {
                presence: true,
                type: {type: 'string', message: 'Must be a word.'},
            },
            email: {
                presence: true,
                email: true,
                type: 'string'
            },
            password: {
                presence: true,
                format: {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'needs to contain at least 8 characters, one digit, one Uppercase, one Lowercase character and one special character.'
                },
                type: 'string'
            }
        };
        
        this.formatValidator.validate({ name, email, password }, schema);
    }
}

export default CreateUserServiceValidator;