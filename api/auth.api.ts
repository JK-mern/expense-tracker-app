import { CreateUserType } from '@/schemas/auth';
import { httpClient } from './httpClient';

type CheckUserExistRequestType = {
  email: string;
};

type CheckUserExistResponseType = {
  data: {
    userExist: boolean;
  };
};

type CheckUserNameExistResponseType = {
  success: boolean;
  data: {
    isUserNameAvailable: boolean;
  };
};

type CreateUserResponseType = {
  success: boolean;
};

export const checkUserExist = async ({
  email
}: CheckUserExistRequestType): Promise<CheckUserExistResponseType> => {
  try {
    const result = await httpClient.post('/auth/checkUserExist', { email });
    const data = result.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const checkUserNameExist = async (
  userName: string
): Promise<CheckUserNameExistResponseType> => {
  try {
    const result = await httpClient.post('/auth/checkUserNameExist', {
      userName
    });
    const data = result.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  body: CreateUserType
): Promise<CreateUserResponseType> => {
  try {
    const result = await httpClient.post('/auth/createUser', body);
    const data = result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
