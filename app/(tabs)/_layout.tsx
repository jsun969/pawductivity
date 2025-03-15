import { Link, Tabs } from 'expo-router';

import { NewTodoButton } from '../../components/NewTodoButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="todo"
        options={{
          title: 'Todo List',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-ul" color={color} />,
          headerRight: () => (
            <Link href="/newTodo" asChild>
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
