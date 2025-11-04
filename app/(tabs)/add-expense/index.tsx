import AddExpenseScreen from '@/screens/add-expense/add-expense-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddExpense = () => {
  return (
    <SafeAreaView className="flex-1">
      <AddExpenseScreen />
    </SafeAreaView>
  );
};

export default AddExpense;
