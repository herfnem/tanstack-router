import { create } from 'zustand';

interface BearState {
  bears: number | null;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useBrearStore = create<BearState>((set) => ({
  bears: null,
  increasePopulation: () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((json) => set({ bears: json.id }));
  },
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
