import 'react-native-get-random-values';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '~/lib/zustand-storage';

export interface CoinState {
  // The state
  coins: number;
  // The actions
  setCoins: (fn: (prev: number) => number) => void;
}

// use create to create a react hook and persist as a middleware with our custom storage
export const useCoinsStore = create<CoinState>()(
  persist(
    (set) => ({
      coins: 0,
      setCoins: (fn) => set((state) => ({ coins: fn(state.coins) })),
    }),
    {
      name: 'coins', // Change this to a unique name
      storage, // remember to import this from "lib"
    }
  )
);

// Usage
// const { coins, setCoins } = useCoinsStore();
// setCoins((prev) => prev + 1); // increase coin
// setCoins((prev) => prev - 1); // decrease coin
// </Text>{coins}</Text> // display coin
