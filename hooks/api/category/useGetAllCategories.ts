import { getAllCategories } from '@/api/category.api';
import { DATA_QUERY_KEYS } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: [DATA_QUERY_KEYS.getAllCategories],
    queryFn: getAllCategories
  });
};
