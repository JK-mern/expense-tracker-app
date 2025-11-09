import { updateUserBalance } from '@/api/user.api';
import { useLoading } from '@/providers/loading-provider';
import { updateBalanceSchema, UpdateBalanceType } from '@/schemas/balance';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import BottomSheetContainer from '../common/bottom-sheet';

type UpdateBalanceBottomSheetProps = {
  ref: React.RefObject<BottomSheet | null>;
  currentBalance: string;
};

export const UpdateBalanceBottomSheet = ({
  ref,
  currentBalance
}: UpdateBalanceBottomSheetProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateBalanceType>({
    resolver: zodResolver(updateBalanceSchema),
    defaultValues: {
      balance: currentBalance
    }
  });
  const { hideLoading, isLoading, showLoading } = useLoading();

  const handleUpdateBalance: SubmitHandler<UpdateBalanceType> = async (
    data
  ) => {
    try {
      showLoading();
      const result = await updateUserBalance(data);
      if (result) {
        //handle toast logic
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
      ref.current?.close();
    }
  };

  return (
    <Portal>
      <BottomSheetContainer title="Update Your Balance" innerRef={ref}>
        <BottomSheetView className="flex-1">
          <Text className="mt-1 text-center font-inter leading-normal text-text-light/80">
            Enter your new current account balance.
          </Text>

          <View className="my-5 flex-1 justify-between p-4">
            <View className="gap-2">
              <Text className="font-inter-medium text-base leading-normal text-text-light">
                Amount
              </Text>

              <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                  <TextInput
                    className="rounded-2xl border border-gray-300 p-4 text-base text-text-light focus:outline-none focus:ring-0"
                    placeholder="25000"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>

            <Pressable
              className="mt-3 rounded-full bg-primary p-3"
              onPress={handleSubmit(handleUpdateBalance)}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffff" size="small" />
              ) : (
                <Text className="text-center font-inter-bold text-base text-white/90">
                  Update Balance
                </Text>
              )}
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetContainer>
    </Portal>
  );
};
