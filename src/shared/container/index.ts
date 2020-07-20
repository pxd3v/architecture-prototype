import { container } from 'tsyringe';
import UserAuthenticationService from '@shared/infra/services/UserAuthentication/UserAuthenticationService';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import FormatValidationService from '@shared/infra/services/FormatValidation/FormatValidationService';
import IFormatValidator from '@shared/services/FormatValidation/IFormatValidationService';
import IUserAuthenticationService from '@shared/services/UserAuthentication/IUserAuthenticationService';


container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IFormatValidator>('FormatValidator', FormatValidationService);
container.registerSingleton<IUserAuthenticationService>('UserAuthenticationService', UserAuthenticationService);
