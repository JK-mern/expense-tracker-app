import { API_ROUTES } from '@/constants/route';
import { UserProfileData } from '@/types/user/user';
import { httpClient } from './httpClient';
import { UpdateBalanceType } from '@/schemas/balance';

export type GetCurrentUserResponseType = {
  status: boolean;
  data: {
    userName: string;
    email: string;
    profilePicture: string | null;
    isProfileCompleted: boolean;
    currentBalance: string;
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

export const updateUserBalance = async (
  data: UpdateBalanceType
): Promise<{ success: boolean }> => {
  try {
    const result = await httpClient.post(
      API_ROUTES.updateCurrentBalance.getPath(),
      data
    );
    const resultData = await result.data;
    return resultData.status;
  } catch (error) {
    throw error;
  }
};
