import { getCurrentUser } from '@/api/user.api';
import { DATA_QUERY_KEYS } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrentUser = (enabled: boolean) => {
  return useQuery({
    queryKey: [DATA_QUERY_KEYS.getCurrentUser],
    queryFn: getCurrentUser,
    enabled
  });
};
