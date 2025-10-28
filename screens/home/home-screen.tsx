import Balance from '@/components/home-screen/balance';
import CategoryWiseExpense from '@/components/home-screen/category-wise-expense';
import Header from '@/components/home-screen/header';
import { View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Header title="Overview" />
      <View className="flex gap-8 p-4">
        <Balance />
        <CategoryWiseExpense />
      </View>
    </View>
  );
};

export default HomeScreen;
