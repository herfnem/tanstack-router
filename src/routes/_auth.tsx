import { useBrearStore } from '@/store/todo';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    const { authToken } = context.authentication;
    const { increasePopulation, bears } = useBrearStore.getState();
    if (!bears) {
      increasePopulation();
    }
    if (!authToken && !bears) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  loader: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
  },
  staleTime: 1000 * 60 * 5,
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 15,
  component: () => <Outlet />,
});
