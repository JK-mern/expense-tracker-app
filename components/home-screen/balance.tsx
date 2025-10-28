import { getFormattedPrice } from '@/utils';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, View } from 'react-native';

type BalanceProps = {
  currentBalance: number;
};

const Balance = ({ currentBalance }: BalanceProps) => {
  return (
    <View className="rounded-3xl bg-primary p-6">
      <View className="flex flex-row items-start justify-between">
        <View className="">
          <Text className="text-sm text-white/80">Current Balance</Text>
          <Text className="mt-1 font-inter-bold text-4xl text-white/80">
            {getFormattedPrice(currentBalance)}
          </Text>
        </View>
        <View className="opacity-50">
          <MaterialCommunityIcons
            name="wallet-outline"
            size={35}
            color="white"
          />
        </View>
      </View>
    </View>
  );
};

export default Balance;
