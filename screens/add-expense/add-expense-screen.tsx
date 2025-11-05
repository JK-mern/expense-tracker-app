import { getAllCategories } from '@/api/category.api';
import { addExpense } from '@/api/expense.api';
import Description from '@/components/add-expense/description';
import SelectCategory from '@/components/add-expense/select-category';
import SelectDate from '@/components/add-expense/select-date-category';
import SelectCategoriesBottomSheet from '@/components/common/select-category-sheet';
import SelectDateBottomSheet from '@/components/common/select-date-sheet';
import { Header } from '@/components/home-screen';
import { useLoading } from '@/providers/loading-provider';
import { createExpenseSchema, CreateExpese } from '@/schemas/expense';
import { ExpenseCategories } from '@/types/expense/expense';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import { DateType } from 'react-native-ui-datepicker';

const AddExpenseScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const [categories, setCategories] = useState<ExpenseCategories[]>([]);
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

  const handleCategorySelect = (categoyrId: number) => {
    setSelectedCategoryId(categoyrId);
    setValue('categoryId', categoyrId);
    setSelectedCategoryName(
      () =>
        categories.find((category) => category.id === categoyrId)?.name ?? null
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

  //TODO : handle error and success toast
  const onSubmit: SubmitHandler<CreateExpese> = async (data) => {
    try {
      showLoading();
      await addExpense(data);
      reset();
      setSelectedCategoryId(null);
      setSelectedCategoryName(null);
      setSelectedDate(null);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (error) {
        console.log('failed to fetch categories', error);
      }
    }

    getCategories();
  }, []);

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
              rules={{}}
              render={({ field }) => (
                <TextInput
                  className="h-20 rounded-xl border-none bg-transparent px-2 py-3 text-right font-inter-bold text-5xl text-text-light focus:outline-none"
                  placeholder="0"
                  keyboardType="numeric"
                  id="amount"
                  onChangeText={(value) => field.onChange(Number(value))}
                  value={String(field.value === 0 ? '' : field.value)}
                />
              )}
            />
          </View>
        </View>

        <SelectCategory
          onSelect={() => categorySelectBottomSheetRef.current?.snapToIndex(2)}
          categoryName={selectedCategoryName}
        />

        <SelectDate
          onDateSelect={() => dateSelectBottomSheetRef.current?.snapToIndex(2)}
          selectedDate={selectedDate}
        />
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
