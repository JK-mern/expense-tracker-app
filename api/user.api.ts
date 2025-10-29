import { httpClient } from './httpClient';

export type GetCurrentUserResponseType = {
  status: boolean;
  data: {
    userName: string;
    email: string;
    profilePicture: string | null;
  };
};

export const getCurrentUser = async (): Promise<GetCurrentUserResponseType> => {
  try {
    const result = await httpClient.get('user/currentUser');
    const data = result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
