import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  authToken?: string;
};

type Action = {
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
};

export type AuthTokenProps = State & Action;

const initialState: State = {
  authToken: undefined,
};

const useAuthToken = create<AuthTokenProps>()(
  persist(
    (set) => ({
      ...initialState,
      setAuthToken: (token) => {
        set({ authToken: token });
      },
      removeAuthToken: () => {
        set(initialState);
      },
    }),
    {
      name: 'auth',
    },
  ),
);

export default useAuthToken;
