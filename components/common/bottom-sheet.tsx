import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';

type BottomSheetContainerProps = {
  children: React.ReactNode;
  title?: string;
  innerRef: React.RefObject<BottomSheetMethods | null>;
  isContentPanningGestureEnabled?: boolean;
  isHandlePanningGestureEnabled?: boolean;
  isIndicatorDisabled?: boolean;
};

const BottomSheetContainer = ({
  children,
  title,
  innerRef,
  isContentPanningGestureEnabled,
  isHandlePanningGestureEnabled,
  isIndicatorDisabled
}: BottomSheetContainerProps) => {
  const snapPoints = useMemo(() => ['16%', '40%', '50%'], []);

  const handleClose = useCallback(() => {
    innerRef?.current?.close();
  }, []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={innerRef}
      index={-1}
      enablePanDownToClose={true}
      onClose={handleClose}
      enableHandlePanningGesture={isHandlePanningGestureEnabled}
      enableContentPanningGesture={isContentPanningGestureEnabled}
      handleIndicatorStyle={{ opacity: isIndicatorDisabled ? 0 : 1 }}
    >
      <Text className="px-3 text-center font-inter-bold text-base">
        {title}
      </Text>
      <View>{children}</View>
    </BottomSheet>
  );
};

export default BottomSheetContainer;
