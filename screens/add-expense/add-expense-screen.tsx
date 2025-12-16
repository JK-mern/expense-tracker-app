import { addExpense } from '@/api/expense.api';
import Description from '@/components/add-expense/description';
import SelectCategory from '@/components/add-expense/select-category';
import SelectDate from '@/components/add-expense/select-date-category';
import SelectCategoriesBottomSheet from '@/components/common/select-category-sheet';
import SelectDateBottomSheet from '@/components/common/select-date-sheet';
import { Header } from '@/components/home-screen';
import { DATA_QUERY_KEYS } from '@/constants/query-key';
import { useGetAllCategories } from '@/hooks/api';
import { useLoading } from '@/providers/loading-provider';
import { CreateExpense, createExpenseSchema } from '@/schemas/expense';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import {
  ActivityIndicator,
  Easing,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { DateType } from 'react-native-ui-datepicker';

const AddExpenseScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const methods = useForm({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0
    }
  });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = methods;
  const { showLoading, isLoading, hideLoading } = useLoading();
  const categorySelectBottomSheetRef = useRef<BottomSheet | null>(null);
  const dateSelectBottomSheetRef = useRef<BottomSheet | null>(null);
  const { data: categories = [] } = useGetAllCategories();
  const queryClient = useQueryClient();

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setValue('categoryId', categoryId);
    setSelectedCategoryName(
      () =>
        categories.find((category) => category.id === categoryId)?.name ?? null
    );
    categorySelectBottomSheetRef.current?.close();
  };

  const handleDateSelect = (date: DateType) => {
    setSelectedDate(date);
    if (date) {
      const selectedDate = new Date(date.toLocaleString());
      setValue('date', new Date());
    }
    dateSelectBottomSheetRef.current?.close();
  };

  const onSubmit: SubmitHandler<CreateExpense> = async (data) => {
    try {
      showLoading();
      await addExpense(data);
      queryClient.invalidateQueries({
        queryKey: [DATA_QUERY_KEYS.getCurrentBalance]
      });
      queryClient.invalidateQueries({
        queryKey: [DATA_QUERY_KEYS.getAggregatedCategorywiseExpense]
      });
      queryClient.invalidateQueries({
        queryKey: [DATA_QUERY_KEYS.getTransactionalHistory]
      });
      Notifier.showNotification({
        title: 'Expense added successfully',
        Component: NotifierComponents.Alert,
        showEasing: Easing.ease,
        componentProps: {
          alertType: 'success'
        },
        translucentStatusBar: true
      });
      reset();
      setSelectedCategoryId(null);
      setSelectedCategoryName(null);
      setSelectedDate(null);
    } catch (error) {
      Notifier.showNotification({
        title: 'Failed to add expense',
        description: 'Please try again',
        Component: NotifierComponents.Alert,
        showEasing: Easing.ease,
        componentProps: {
          alertType: 'error'
        },
        translucentStatusBar: true
      });
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <View className="flex-1">
      <Header title="Add Expense" />
      <View className="flex-1 gap-2 p-4">
        <View className="mb-4 flex flex-row items-center">
          <MaterialIcons
            name="attach-money"
            size={40}
            className="font-inter-bold text-text-light"
          />

          <View className="flex-1">
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <TextInput
                  className="h-20 rounded-xl border-none bg-transparent px-2 py-3 text-right font-inter-bold text-5xl text-text-light"
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    field.onChange(value === '' ? undefined : Number(value))
                  }
                  value={field.value ? String(field.value) : ''}
                />
              )}
            />
          </View>
        </View>

        {errors.amount && (
          <Text className="mb-2 font-inter-medium text-sm text-red-600">
            {errors.amount.message}
          </Text>
        )}

        <View className="flex justify-center">
          <SelectCategory
            onSelect={() =>
              categorySelectBottomSheetRef.current?.snapToIndex(2)
            }
            categoryName={selectedCategoryName}
          />
          {errors.categoryId && (
            <Text className="my-2 ml-2 font-inter-medium text-sm text-red-600">
              {errors.categoryId.message}
            </Text>
          )}
        </View>

        <View className="flex justify-center">
          <SelectDate
            onDateSelect={() =>
              dateSelectBottomSheetRef.current?.snapToIndex(2)
            }
            selectedDate={selectedDate}
          />

          {errors.date && (
            <Text className="my-2 ml-2 font-inter-medium text-sm text-red-600">
              {errors.date.message}
            </Text>
          )}
        </View>

        <FormProvider {...methods}>
          <Description />
        </FormProvider>
      </View>

      <View className="gap-4 p-4">
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="rounded-xl bg-primary px-4 py-3"
        >
          {isLoading ? (
            <ActivityIndicator color="#ffff" />
          ) : (
            <Text className="text-center font-inter-bold text-base text-white">
              Submit
            </Text>
          )}
        </Pressable>
      </View>

      <SelectCategoriesBottomSheet
        expenseCategories={categories}
        onCategorySelect={handleCategorySelect}
        selectCategoryBottomSheetRef={categorySelectBottomSheetRef}
        selectedCategoryId={selectedCategoryId}
      />

      <SelectDateBottomSheet
        datePickerBottomSheetRef={dateSelectBottomSheetRef}
        onDateChange={handleDateSelect}
        selectedDate={selectedDate}
      />
    </View>
  );
};

export default AddExpenseScreen;
