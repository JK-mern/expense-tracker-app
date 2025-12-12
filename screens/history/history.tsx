import SelectCategoriesBottomSheet from '@/components/common/select-category-sheet';
import SelectDateBottomSheet from '@/components/common/select-date-sheet';
import { CategoryList } from '@/components/history/category-list';
import DatePicker from '@/components/history/date-picker';
import ExpenseHistoryList from '@/components/history/expense-history-list';
import { Header } from '@/components/home-screen';
import { useGetAllCategories, useGetTransactionalHistory } from '@/hooks/api';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';

const HistoryScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const selectCategoryBottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const datePickerBottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const { data: expenseCategories = [] } = useGetAllCategories();
  const {
    data: history,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetTransactionalHistory({
    date: selectedDate,
    categoryId: selectedCategoryId
  });

  const transactionHistory = useMemo(() => {
    return history?.pages?.flat() ?? [];
  }, [history]);

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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

  return (
    <View className="flex-1">
      <Header title="History" />
      <View className="gap-6 px-4">
        <View className="flex flex-row justify-between gap-3">
          <CategoryList
            onOpen={() => selectCategoryBottomSheetRef.current?.snapToIndex(2)}
          />
          <DatePicker
            onOpen={() => datePickerBottomSheetRef.current?.snapToIndex(2)}
          />
        </View>
      </View>

      <ExpenseHistoryList
        expenseHistoryList={transactionHistory}
        isInitialDataLoading={isLoading}
        isEndReached={!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={onEndReached}
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
