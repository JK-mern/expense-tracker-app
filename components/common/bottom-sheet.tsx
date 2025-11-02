import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';

type BottomSheetContainerProps = {
  children: React.ReactNode;
  title?: string;
  innerRef: React.RefObject<BottomSheetMethods | null>;
};

const BottomSheetContainer = ({
  children,
  title,
  innerRef
}: BottomSheetContainerProps) => {
  const snapPoints = useMemo(() => ['40%', '50%'], []);

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
    >
      <Text className="px-3 text-center font-inter-bold text-base">
        {title}
      </Text>
      <View>{children}</View>
    </BottomSheet>
  );
};

export default BottomSheetContainer;
