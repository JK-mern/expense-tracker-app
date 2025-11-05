import { useLoading } from '@/providers/loading-provider';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import BottomSheetContainer from './bottom-sheet';

type LogoutDialogProps = {
  ref: React.RefObject<BottomSheet | null>;
  onLogout: () => void;
};

const LogoutDialog = ({ ref, onLogout }: LogoutDialogProps) => {
  const { isLoading } = useLoading();

  return (
    <Portal>
      <BottomSheetContainer
        innerRef={ref}
        title="Are you sure ?"
        isContentPanningGestureEnabled={false}
        isHandlePanningGestureEnabled={false}
        isIndicatorDisabled={true}
      >
        <BottomSheetView>
          <View className="mt-3 flex-1 flex-row p-2">
            <View className="w-full flex-row items-center justify-between">
              <Pressable className="w-[48%] rounded-full bg-primary/80 px-3 py-4 text-center">
                <Text
                  className="text-center font-inter-bold text-white"
                  onPress={() => ref.current?.close()}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="w-[48%] rounded-full bg-red-500 px-3 py-4 text-center"
                onPress={onLogout}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffff" size="small" />
                ) : (
                  <Text className="font-\ text-center text-white">Logout</Text>
                )}
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetContainer>
    </Portal>
  );
};

export default LogoutDialog;
