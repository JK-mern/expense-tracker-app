import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type MenuItem = {
  menuName: string;
  items: { itemName: string }[];
};

const menuItems: MenuItem[] = [
  {
    menuName: 'Account',
    items: [
      {
        itemName: 'Change Password'
      }
    ]
  },
  {
    menuName: 'Support',
    items: [
      {
        itemName: 'Privacy Policy'
      },
      {
        itemName: 'Terms of Service'
      }
    ]
  }
];

export default function ProfileMenu() {
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
            <Pressable>
              <MaterialIcons size={20} name="chevron-right" />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};
