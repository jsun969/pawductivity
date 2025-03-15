import AsyncStorage from '@react-native-async-storage/async-storage';
import superjson from 'superjson';
import { PersistStorage } from 'zustand/middleware';

export const storage: PersistStorage<unknown> = {
  getItem: async (name: string) => {
    const str = await AsyncStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: async (name: string, value: unknown) => {
    await AsyncStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: async (name: string): Promise<void> => {
    return await AsyncStorage.removeItem(name);
  },
};
