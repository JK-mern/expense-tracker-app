import { getAllCategories } from '@/api/category.api';
import { getTransactionHistory } from '@/api/expense.api';
import SelectCategoriesBottomSheet from '@/components/common/select-category-sheet';
import SelectDateBottomSheet from '@/components/common/select-date-sheet';
import { CategoryList } from '@/components/history/category-list';
import DatePicker from '@/components/history/date-picker';
import ExpenseHistoryList from '@/components/history/expense-history-list';
import { Header } from '@/components/home-screen';
import { Page_Size } from '@/constants/values';
import { useLoading } from '@/providers/loading-provider';
import {
  ExpenseCategories,
  TransactionHistoryList
} from '@/types/expense/expense';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';

const HistoryScreen = () => {
  const { isLoading, hideLoading, showLoading } = useLoading();
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryList[]
  >([]);
  const [expenseCategories, setExpenseCategories] = useState<
    ExpenseCategories[]
  >([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [isFetchingMoreData, setIsFetchingMoreData] = useState<boolean>(false);
  const selectCategoryBottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const datePickerBottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId((prev) => (prev === id ? null : id));
    selectCategoryBottomSheetRef.current?.close();
  };

  const handleDateChange = (date: DateType) => {
    setSelectedDate((prev) => {
      const prevDay = prev ? dayjs(prev) : null;
      const newDay = dayjs(date);
      const isSame = prevDay && prevDay.isSame(newDay, 'day');

      return isSame ? null : date;
    });
    datePickerBottomSheetRef.current?.close();
  };

  const fetchTransactions = useCallback(
    async (requestedPage = 1) => {
      if (requestedPage === 1) {
        showLoading();
      }

      try {
        if (requestedPage === 1) {
          setIsEndReached(false);
        }

        if (requestedPage > 1) {
          setIsFetchingMoreData(true);
        }

        const lists = await getTransactionHistory({
          categoryId: selectedCategoryId,
          date: selectedDate,
          page: requestedPage
        });

        setTransactionHistory((prev) =>
          requestedPage === 1 ? lists : [...prev, ...lists]
        );
        setIsEndReached(lists.length < Page_Size);
        setCurrentPage(requestedPage);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
        setIsFetchingMoreData(false);
      }
    },
    [selectedCategoryId, selectedDate, currentPage, isEndReached]
  );

  const handleLoadMore = useCallback(() => {
    if (isEndReached || isFetchingMoreData) {
      return;
    }
    fetchTransactions(currentPage + 1);
  }, [isEndReached, isFetchingMoreData]);

  useEffect(() => {
    setTransactionHistory([]);
    setCurrentPage(1);
    setIsEndReached(false);
    fetchTransactions(1);
  }, [selectedCategoryId, selectedDate]);

  useEffect(() => {
    async function fetchCategoryData() {
      const categories = await getAllCategories();
      setExpenseCategories(categories);
    }
    fetchCategoryData();
  }, []);

  return (
    <View className="flex-1">
      <Header title="History" />
      <View className="gap-6 px-4">
        <View className="flex flex-row justify-between gap-3">
          <CategoryList
            onOpen={() => selectCategoryBottomSheetRef.current?.snapToIndex(1)}
          />
          <DatePicker
            onOpen={() => datePickerBottomSheetRef.current?.snapToIndex(1)}
          />
        </View>
      </View>

      <ExpenseHistoryList
        expenseHistoryList={transactionHistory}
        isInitialDataLoading={isLoading}
        isEndReached={isEndReached}
        isFetchingMoreData={isFetchingMoreData}
        onEndReached={handleLoadMore}
      />

      <SelectCategoriesBottomSheet
        expenseCategories={expenseCategories}
        onCategorySelect={handleSelectCategory}
        selectCategoryBottomSheetRef={selectCategoryBottomSheetRef}
        selectedCategoryId={selectedCategoryId}
      />

      <SelectDateBottomSheet
        datePickerBottomSheetRef={datePickerBottomSheetRef}
        onDateChange={handleDateChange}
        selectedDate={selectedDate}
      />
    </View>
  );
};

export default HistoryScreen;
