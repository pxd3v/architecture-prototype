import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/AuthenticateUser/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import JWTAuthenticationService from '@shared/infra/services/JWTAuthenticationService/JWTAuthenticationService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate when user exist', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const jwtAuthenticationService = new JWTAuthenticationService();
        const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider, jwtAuthenticationService);
        
        const newUser = await fakeUsersRepository.create({name: 'pedro', email: 'pedro@lett.digital', password: 'pedro123'});

        const { user, token } = await authenticateUserService.execute({
            email: 'pedro@lett.digital',
            password: 'pedro123'
        });

        expect(token).toBeTruthy();
        expect(user.name).toBe(newUser.name);
        expect(user.email).toBe(newUser.email);
        expect(user.password).toBe(newUser.password);
        expect(user.last_login_date).toBeTruthy();
    });
    it('should not be able to authenticate when wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const jwtAuthenticationService = new JWTAuthenticationService();
        const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider, jwtAuthenticationService);
        
        await fakeUsersRepository.create({name: 'pedro', email: 'pedro@lett.digital', password: 'pedro123'});
        
        expect.assertions(1);
        try {
            await authenticateUserService.execute({
                email: 'pedro@lett.digital',
                password: 'pedro'
            });
        } catch (e) {
            expect(e).toEqual({
                message:  'Incorrect email/password combination.',
                statusCode: 401,
            });
        } 
    });
});