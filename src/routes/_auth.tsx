import { useUserStore } from '@/store/user';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    const { authToken } = context.authentication;
    const { fetchUser, userId } = useUserStore.getState();
    if (!userId) {
      await fetchUser();
    }
    const { userId: freshUserId } = useUserStore.getState();
    if (!authToken || !freshUserId) {
      throw redirect({ to: '/', search: { redirect: location.href } });
    }
  },
  // loader: async () => {
  //   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  //   const data = await res.json();
  //   return data;
  // },
  staleTime: 1000 * 60 * 5,
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 15,
  component: () => <Outlet />,
});
