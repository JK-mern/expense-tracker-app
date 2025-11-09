import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

type MenuItem = {
  menuName: string;
  items: { itemName: string; action: () => void }[];
};

type ProfileMenuProps = {
  ref: React.RefObject<BottomSheet | null>;
};

export default function ProfileMenu({ ref }: ProfileMenuProps) {
  const menuItems: MenuItem[] = [
    {
      menuName: 'Account',
      items: [
        {
          itemName: 'Update balance',
          action: () => handleOpenSheet()
        },
        {
          itemName: 'Change Password',
          action: () => {}
        }
      ]
    },
    {
      menuName: 'Support',
      items: [
        {
          itemName: 'Privacy Policy',
          action: () => {}
        },
        {
          itemName: 'Terms of Service',
          action: () => {}
        }
      ]
    }
  ];

  const handleOpenSheet = () => {
    ref.current?.snapToIndex(1);
  };

  return (
    <View className="gap-6">
      {menuItems.map((menu) => (
        <Menu menuName={menu.menuName} items={menu.items} key={menu.menuName} />
      ))}
    </View>
  );
}

const Menu = (menu: MenuItem) => {
  return (
    <View className="gap-2">
      <Text className="font-inter-bold text-lg">{menu.menuName}</Text>
      {menu.items.map((item) => (
        <View className="shadow-sm rounded-xl bg-white" key={item.itemName}>
          <View className="flex flex-row items-center justify-between border-b border-black/5 p-4">
            <Text className="font-inter text-base">{item.itemName}</Text>
            <Pressable onPress={item.action}>
              <MaterialIcons size={20} name="chevron-right" />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};
