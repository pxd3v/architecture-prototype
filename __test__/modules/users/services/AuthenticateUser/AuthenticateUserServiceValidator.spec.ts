import 'reflect-metadata';
import AuthenticateUserServiceValidator from '@modules/users/services/AuthenticateUser/AuthenticaUserServiceValidator';
import ValidateJsService from '@shared/infra/services/ValidateJsService/ValidateJsService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

describe('AuthenticateUserValidator', () => {
    it('should not be able to authenticate when user does not exist', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const formatValidationService = new ValidateJsService();
        const authenticateUserServiceValidator = new AuthenticateUserServiceValidator(fakeUsersRepository, formatValidationService);

        expect.assertions(1);
        try {
            await authenticateUserServiceValidator.execute({
                email: 'pedro@lett.digital',
                password: 'invalidpassword'
            });
        } catch (e) {
            expect(e).toEqual({
                message:  'Incorrect email/password combination.',
                statusCode: 401,
            });
        }
    });

    it('should be able to authenticate when user exist', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const formatValidationService = new ValidateJsService();
        const authenticateUserServiceValidator = new AuthenticateUserServiceValidator(fakeUsersRepository, formatValidationService);
        fakeUsersRepository.create({name: 'pedro', email: 'pedro@lett.digital', password: 'Pedro1234@'});

        try {
            await authenticateUserServiceValidator.execute({
                email: 'pedro@lett.digital',
                password: 'Pedro1234@'
            });
        } catch (e) {
            expect(e).toEqual(undefined);
        }
    });
});