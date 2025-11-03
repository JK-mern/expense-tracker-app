import { Portal } from '@gorhom/portal';
import BottomSheetContainer from './bottom-sheet';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker, {
  DateType,
  useDefaultClassNames
} from 'react-native-ui-datepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

type SelectDateBottomSheetProps = {
  datePickerBottomSheetRef: React.RefObject<BottomSheet | null>;
  onDateChange: (date: DateType) => void;
  selectedDate: DateType | null;
};

const SelectDateBottomSheet = ({
  datePickerBottomSheetRef,
  onDateChange,
  selectedDate
}: SelectDateBottomSheetProps) => {
  const defaultClassNames = useDefaultClassNames();

  return (
    <Portal>
      <BottomSheetContainer innerRef={datePickerBottomSheetRef}>
        <BottomSheetView>
          <View className="">
            <DateTimePicker
              mode="single"
              date={selectedDate ?? new Date()}
              onChange={({ date }) => {
                onDateChange(date);
              }}
              components={{
                IconNext: <MaterialIcons name="chevron-right" size={24} />,
                IconPrev: <MaterialIcons name="chevron-left" size={24} />
              }}
              classNames={{
                ...defaultClassNames,
                today: 'underline underline-offset-8 decoration-primary',
                button_next: 'bg-primary/20 rounded p-3 mb-2',
                button_prev: 'bg-primary/20 rounded p-3 mb-2',
                day_cell: 'w-10  h-10',
                selected: 'bg-primary/70 rounded-full',
                day_label: 'text-text-light font-inter',
                selected_label: 'text-white font-inter-bold',
                month_label: 'text-text-light font-inter',
                selected_month: 'bg-primary/70 rounded-full',
                selected_month_label: 'text-white font-inter',
                selected_year: 'bg-none   rounded-full',
                selected_year_label:
                  'text-text-light underline font-inter-bold',
                year_label: 'text-text-light  font-inter',
                active_year: 'bg-primary/70 rounded-full',
                active_year_label: 'text-white  font-inter-bold'
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetContainer>
    </Portal>
  );
};

export default SelectDateBottomSheet;
