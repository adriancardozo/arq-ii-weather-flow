import { User } from 'src/bussiness/entities/user.entity';
import { UnknownError } from 'src/bussiness/errors/unknown.error';
import { UserAlreadyExistsError } from 'src/bussiness/errors/user-already-exists.error';
import { CreateUserInput } from 'src/bussiness/ports/input/services/dtos/input/create-user.input';
import { LoginInput } from 'src/bussiness/ports/input/services/dtos/input/login.input';
import { mock } from 'test/resources/mocks/mock';

export const user: jest.Mocked<User> = mock(User);

export const registeredUser: jest.Mocked<User> = mock(User);

export const createUserInput: jest.Mocked<CreateUserInput> = mock(CreateUserInput);

export const session = new Object({});

export const alreadyExistsError = new UserAlreadyExistsError();

export const unknownError = new UnknownError();

export const registeredUserAccessToken = 'Bearer access.token';

export const registeredUserLoginInput: LoginInput = mock(LoginInput);

export const loginUser: jest.Mocked<User> = mock(User);

export const loginAccessToken = 'Bearer access.token';

export const loginUserLoginInput: LoginInput = mock(LoginInput);

export const toValidateEmail = 'juanperez@mail.com';

export const toValidatePassword = 'Juanperez1234!';

export const toValidateFoundUser: jest.Mocked<User> = mock(User);
