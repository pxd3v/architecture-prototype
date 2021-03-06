import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUser/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        
        const user = await createUserService.execute({
            name: 'pedro',
            email: 'pedro@lett.digital',
            password: 'pedro123'
        });

        expect(user).toHaveProperty('id');
        expect(user.name).toBe('pedro');
        expect(user.email).toBe('pedro@lett.digital');
        expect(user.last_login_date).toBe(undefined);
    });
});