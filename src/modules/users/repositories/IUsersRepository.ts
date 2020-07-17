import User from '../infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    create(data: ICreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    updateLastLoginDate(id: string, date: Date): Promise<Date>;
    save(user: User): Promise<User>;
};