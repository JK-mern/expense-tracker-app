import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';

type SelectDateProps = {
  onDateSelect: () => void;
  selectedDate: DateType;
};

const SelectDate = ({ onDateSelect, selectedDate }: SelectDateProps) => {
  return (
    <View className="flex flex-row items-center gap-4 rounded-xl bg-primary/10 p-4">
      <View className="flex flex-row items-center gap-4">
        <View className="items-center rounded-full bg-primary/20 p-2">
          <MaterialIcons name="calendar-today" size={24} color="#30e86e" />
        </View>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Text className="text-base text-gray-800">
          {selectedDate
            ? new Date(selectedDate.toString()).toLocaleDateString()
            : 'Select date'}
        </Text>
        <Pressable onPress={onDateSelect}>
          <MaterialIcons size={15} name="calendar-today" />
        </Pressable>
      </View>
    </View>
  );
};

export default SelectDate;
