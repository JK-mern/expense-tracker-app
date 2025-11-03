import { ExpenseCategories } from '@/types/expense/expense';
import { Portal } from '@gorhom/portal';
import BottomSheetContainer from './bottom-sheet';
import { Pressable, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CategoryIcons } from '@/utils/icons';
import { MaterialIcons } from '@expo/vector-icons';

type SelectCategoriesProps = {
  expenseCategories: ExpenseCategories[];
  onCategorySelect: (id: number) => void;
  selectedCategoryId: number | null;
  selectCategoryBottomSheetRef: React.RefObject<BottomSheet | null>;
};

const SelectCategoriesBottomSheet = ({
  expenseCategories,
  onCategorySelect,
  selectedCategoryId,
  selectCategoryBottomSheetRef
}: SelectCategoriesProps) => {
  return (
    <Portal>
      <BottomSheetContainer
        title="Select Category"
        innerRef={selectCategoryBottomSheetRef}
      >
        <View className="mb-10 p-5">
          <BottomSheetScrollView>
            {expenseCategories.map((category) => (
              <Pressable
                onPress={() => onCategorySelect(category.id)}
                key={category.id}
              >
                <View>
                  <View className="mb-4 flex flex-row items-center justify-between px-2">
                    <View className="flex flex-row items-center gap-3">
                      <View className="gap-4 rounded-full bg-primary/20 p-3">
                        <MaterialIcons
                          name={CategoryIcons[category.name].iconName}
                          size={24}
                          color="#30e86e"
                        />
                      </View>
                      <Text>{category.name}</Text>
                    </View>
                    <View>
                      {selectedCategoryId === category.id && (
                        <MaterialIcons name="check" size={24} color="#30e86e" />
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </BottomSheetScrollView>
        </View>
      </BottomSheetContainer>
    </Portal>
  );
};

export default SelectCategoriesBottomSheet;
