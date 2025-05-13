import { create } from 'zustand';
import useAuthToken from './auth';

interface UserState {
  userId: number | null;
  fetchUser: () => Promise<void>;
  removeUser: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  fetchUser: async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    const data = await response.json();
    set({
      userId: data.id,
    });
  },
  removeUser: () => set({ userId: null }),
  logout: () => {
    const { removeAuthToken } = useAuthToken.getState();
    removeAuthToken();
    set({ userId: null });
  },
}));
