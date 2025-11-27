import { MaterialIcons } from '@expo/vector-icons';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, View } from 'react-native';

const Description = () => {
  const { control } = useFormContext();
  return (
    <View className="flex flex-row items-center gap-4 rounded-xl bg-primary/10 p-4">
      <View className="flex flex-row items-center gap-4">
        <View className="mb-3 items-center rounded-full bg-primary/20 p-2">
          <MaterialIcons name="description" size={24} color="#30e86e" />
        </View>
      </View>
      <View className="flex-1 justify-center">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextInput
              multiline={true}
              className="rounded-xl border-none bg-transparent px-2 py-3 font-inter text-base text-text-light focus:outline-none"
              placeholder="Description"
              keyboardType="default"
              id="description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Description;
