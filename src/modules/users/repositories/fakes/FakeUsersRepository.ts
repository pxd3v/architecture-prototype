import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create({name, email, password}: ICreateUserDto): Promise<User> {
        const user = new User();
        
        Object.assign(user, {id: uuid(), name, email, password});
        user.name = name;
        user.email = email;
        user.password = password;
        user.id = uuid();

        await this.save(user);

        return user;
    }

    public async updateLastLoginDate(id: string, date: Date): Promise<Date> {
        this.users = this.users.map(u => {
            if(u.id === id){
                u.last_login_date = date;
            }
            return u;
        });
        return date;
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(u => u.id === id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(u => u.email === email);
    }

    public async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
}

export default FakeUsersRepository;