import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUser/AuthenticateUserService';
import AuthenticateUserServiceValidator from '@modules/users/services/AuthenticateUser/AuthenticaUserServiceValidator';
export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserServiceValidator = container.resolve(AuthenticateUserServiceValidator);
        await authenticateUserServiceValidator.execute({
            email, 
            password
        });
        
        const authenticateUserService = container.resolve(AuthenticateUserService);
        const { user, token } = await authenticateUserService.execute({
            email, 
            password
        });

        return response.status(200).json({ user, token });
    } 
}