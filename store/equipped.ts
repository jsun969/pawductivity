import 'react-native-get-random-values';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '~/lib/zustand-storage';

export interface equippedState {
  purchasedItems: Set<string>;
  equippedItems: Map<string, string>;
  // The actions
  addPurchased: (newID: string) => void;
  changeEquipped: (category: string, newID: string) => void;
}

export const useEquippedStore = create<equippedState>()(
  persist(
    (set) => ({
      purchasedItems: new Set(['0', '6', '12']),
      equippedItems: new Map([
        ['Breed', '12'],
        ['Backgrounds', '6'],
        ['Furniture', '0'],
      ]),

      addPurchased: (newID) => {
        set((state) => {
          const newPurchased = new Set(state.purchasedItems);
          newPurchased.add(newID);
          return { purchasedItems: newPurchased };
        });
      },
      changeEquipped: (category, newID) => {
        set((state) => {
          const newEquipped = new Map(state.equippedItems);
          newEquipped.set(category, newID);
          return { equippedItems: newEquipped };
        });
      },
    }),
    {
      name: 'equipped',
      storage,
    }
  )
);
