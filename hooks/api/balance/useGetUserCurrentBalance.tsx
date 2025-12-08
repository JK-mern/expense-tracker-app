import { getCurrentBalance } from '@/api/balance.api';
import { DATA_QUERY_KEYS } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useGetUserCurrentBalance = () => {
  return useQuery({
    queryKey: [DATA_QUERY_KEYS.getCurrentBalance],
    queryFn: getCurrentBalance
  });
};
