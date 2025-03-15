import { Link, Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { NewTodoButton } from '../../components/NewTodoButton';
import { TabBarIcon } from '../../components/TabBarIcon';

import { useCoinsStore } from '~/store/coin';

export default function TabLayout() {
  const { coins } = useCoinsStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerLeft: () => (
          <View className="ml-4 flex flex-row items-center gap-2">
            <Image source={require('../../assets/images/coin.png')} className="size-6" />
            <Text className="text-lg font-bold">{coins}</Text>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="todo"
        options={{
          title: 'Todo List',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-ul" color={color} />,
          headerRight: () => (
            <Link href="/new-todo" asChild>
              <NewTodoButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pet',
          tabBarIcon: ({ color }) => <TabBarIcon name="cat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <TabBarIcon name="store" color={color} />,
        }}
      />
    </Tabs>
  );
}
