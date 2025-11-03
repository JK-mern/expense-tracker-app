import { MaterialIcons } from '@expo/vector-icons';

type CategoryIconMapType = Record<
  string,
  { iconName: keyof typeof MaterialIcons.glyphMap }
>;

export const CategoryIcons: CategoryIconMapType = {
  Food: { iconName: 'restaurant' },
  Travel: { iconName: 'commute' },
  Shopping: { iconName: 'shopping-bag' },
  Bill: { iconName: 'receipt-long' }
};
