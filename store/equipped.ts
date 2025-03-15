import 'react-native-get-random-values';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '~/lib/zustand-storage';

export interface equippedState {
  breed: string;
  background: string;
  furniture: string;
  purchasedItems: Set<string>;
  equippedItems: Set<string>;
  // The actions
  setEquippedBreed: (newID: string) => void;
  setEquippedBackground: (newID: string) => void;
  setEquippedFurniture: (newID: string) => void;
  addPurchased: (newID: string) => void;
  changeEquipped: (oldID: string, newID: string) => void;
}

export const useEquippedStore = create<equippedState>()(
  persist(
    (set) => ({
      breed: '12',
      background: '6',
      furniture: '1', // need to make a default furniture which is nothing
      purchasedItems: new Set(),
      equippedItems: new Set(),
      setEquippedBreed: (newID) => {
        set((state) => {
          return { breed: newID };
        });
      },
      setEquippedBackground: (newID) => {
        set((state) => {
          return { background: newID };
        });
      },
      setEquippedFurniture: (newID) => {
        set((state) => {
          return { furniture: newID };
        });
      },
      addPurchased: (newID) => {
        set((state) => {
          const newPurchased = new Set(state.purchasedItems);
          newPurchased.add(newID);
          return { purchasedItems: newPurchased };
        });
      },
      changeEquipped: (oldID, newID) => {
        set((state) => {
          const newEquipped = new Set(state.equippedItems);
          newEquipped.delete(oldID);
          newEquipped.add(newID);
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
