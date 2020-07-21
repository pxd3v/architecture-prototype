import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import JWTAuthenticationService from '@shared/infra/services/JWTAuthenticationService/JWTAuthenticationService';
import ValidateJsService from '@shared/infra/services/ValidateJsService/ValidateJsService';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ValidateJsService>('ValidateJsService', ValidateJsService);
container.registerSingleton<JWTAuthenticationService>('JWTAuthenticationService', JWTAuthenticationService);
