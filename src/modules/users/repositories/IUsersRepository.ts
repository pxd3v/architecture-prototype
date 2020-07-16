
export default interface IUsersRepository {
    findById(id: number): Promise<User | undefined>
};