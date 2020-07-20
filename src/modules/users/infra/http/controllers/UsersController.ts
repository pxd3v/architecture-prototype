import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUser/CreateUserService';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import CreateUserServiceValidator from '@modules/users/services/CreateUser/CreateUserServiceValidator';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password }: ICreateUserDto = request.body;

        const createUserServiceValidator = container.resolve(CreateUserServiceValidator);

        await createUserServiceValidator.execute({
            name,
            email,
            password
        });

        const createUser = container.resolve(CreateUserService);
    
        const user = await createUser.execute({
            name,
            email,
            password
        });
        
        return response.status(202).json(user);
    }
}
