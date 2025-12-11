import {
  getTransactionHistory,
  TransactionHistoryRequest
} from '@/api/expense.api';
import { DATA_QUERY_KEYS } from '@/constants/query-key';
import { Page_Size } from '@/constants/values';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetTransactionalHistory = ({
  categoryId,
  date
}: Omit<TransactionHistoryRequest, 'page'>) => {
  return useInfiniteQuery({
    queryKey: [DATA_QUERY_KEYS.getTransactionalHistory, categoryId, date],
    queryFn: ({ pageParam }) =>
      getTransactionHistory({ categoryId, date, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < Page_Size) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1
  });
};
