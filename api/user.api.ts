import { API_ROUTES } from '@/constants/route';
import { httpClient } from './httpClient';
import { UserProfileData } from '@/types/user/user';

export type GetCurrentUserResponseType = {
  status: boolean;
  data: {
    userName: string;
    email: string;
    profilePicture: string | null;
    isProfileCompleted: boolean;
  };
};

export const getCurrentUser = async (): Promise<UserProfileData | null> => {
  try {
    const result = await httpClient.get(API_ROUTES.getCurrentUser.getPath());
    const data = result.data;
    return data.data;
  } catch (error) {
    throw error;
  }
};
