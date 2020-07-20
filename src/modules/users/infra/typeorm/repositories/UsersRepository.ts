import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>
    
    constructor() {
        this.ormRepository = getRepository(User);
    }
    
    public async create({name, email, password}: ICreateUserDto): Promise<User> {
        const user = this.ormRepository.create({name, email, password});

        await this.save(user);

        return user;
    }

    public async updateLastLoginDate(id: string, date: Date): Promise<Date> {
        await this.ormRepository.update(id, { last_login_date: date});

        return date;
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({where: {id}});
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({where: {email}});
    }

    public async save(user: User): Promise<User> {
        return await this.ormRepository.save(user);
    }
}

export default UsersRepository;