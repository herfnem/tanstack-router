import { Button } from '@/components/ui/button';
import useAuthToken from '@/store/auth';
import {
  createFileRoute,
  Link,
  // redirect,
  useNavigate,
} from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  // beforeLoad: async ({ context }) => {
  //   const { authToken } = context.authentication;
  //   if (authToken) {
  //     throw redirect({ to: '/dashboard' });
  //   }
  // },
});

function RouteComponent() {
  const { authToken, setAuthToken, removeAuthToken } = useAuthToken();
  const redirect_path = Route.useSearch() as { redirect?: string };
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
      <Button
        onClick={() => {
          setAuthToken('token');
          navigate({
            to: redirect_path.redirect || '/dashboard',
          });
        }}
      >
        Login
      </Button>
      <p>{authToken}</p>
      <Button onClick={removeAuthToken}>Logout</Button>
      <p>Login page</p>
      <p>Redirect to home page</p>
    </div>
  );
}
