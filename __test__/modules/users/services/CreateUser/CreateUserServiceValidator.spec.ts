import 'reflect-metadata';
import CreateUserServiceValidator from '@modules/users/services/CreateUser/CreateUserServiceValidator';
import FormatValidationService from '@shared/infra/services/FormatValidation/FormatValidationService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
    it('should not be able to create a new user with invalid password format', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const formatValidationService = new FormatValidationService();
        const createUserServiceValidator = new CreateUserServiceValidator(fakeUsersRepository, formatValidationService);

        expect.assertions(1);
        try {
            await createUserServiceValidator.execute({
                name: 'pedro',
                email: 'pedro@lett.digital',
                password: 'invalidpassword'
            });
        } catch (e) {
            expect(e).toEqual({
                messages:  [
                    'Password needs to contain at least 8 characters, one digit, one Uppercase, one Lowercase character and one special character.',
                ],
                statusCode: 400,
            });
        }
    });

    it('should not be able to create a new user with invalid email format', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const formatValidationService = new FormatValidationService();
        const createUserServiceValidator = new CreateUserServiceValidator(fakeUsersRepository, formatValidationService);
        
        expect.assertions(1);
        try {
            await createUserServiceValidator.execute({
                name: 'pedro',
                email: 'pedro',
                password: 'Pedro1234@'
            });
        } catch (e) {
            expect(e).toEqual({
                messages:  [
                    'Email is not a valid email',
                ],
                statusCode: 400,
            });
        }    
            
    });

    it('should not be able to create two users with the same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const formatValidationService = new FormatValidationService();
        const createUserServiceValidator = new CreateUserServiceValidator(fakeUsersRepository, formatValidationService);
        
        fakeUsersRepository.create({name: 'pedro', email: 'pedro@lett.digital', password: 'Pedro1234@'});

        expect.assertions(1);
        try {
            await createUserServiceValidator.execute({
                name: 'pedro',
                email: 'pedro@lett.digital',
                password: 'Pedro1234@'
            });
        } catch (e) {
            expect(e).toEqual({
                message: 'Email address already used.',
                statusCode: 400
            });
        }    
            
    });

    it('should be able to create user with the an unused email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const formatValidationService = new FormatValidationService();
        const createUserServiceValidator = new CreateUserServiceValidator(fakeUsersRepository, formatValidationService);
        
        try {
            await createUserServiceValidator.execute({
                name: 'pedro',
                email: 'pedro@lett.digital',
                password: 'Pedro1234@'
            });
        } catch (e) {
            expect(e).toEqual(undefined);
        }    
            
    });
});