import { CreateUserType } from '@/schemas/auth';
import { httpClient } from './httpClient';
import { API_ROUTES } from '@/constants/route';

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
    const result = await httpClient.post(API_ROUTES.checkUserExist.getPath(), {
      email
    });
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
    const result = await httpClient.post(
      API_ROUTES.checkUserNameExist.getPath(),
      {
        userName
      }
    );
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
    const result = await httpClient.post(API_ROUTES.createUser.getPath(), body);
    const data = result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
