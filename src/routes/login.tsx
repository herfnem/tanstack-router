import { Button } from '@/components/ui/button';
import useAuthToken from '@/store/auth';
import { useUserStore } from '@/store/user';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { LockKeyhole } from 'lucide-react';

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
  const { authToken, setAuthToken } = useAuthToken();
  const { logout } = useUserStore();
  const redirect_path = Route.useSearch() as { redirect?: string };
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="bg-secondary-foreground hover:shadow-primary/10 w-full max-w-md transform space-y-8 rounded-xl p-10 shadow-2xl transition-all">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-primary/10 text-primary rounded-full p-4">
            <LockKeyhole size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-card-foreground text-center text-4xl font-extrabold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-center">
            Sign in to access your account.
          </p>
        </div>

        <div className="space-y-6">
          <Button
            onClick={() => {
              setAuthToken(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
              );
              navigate({
                to: redirect_path.redirect || '/dashboard',
              });
            }}
            className="w-full py-3 text-lg font-semibold"
            size="lg"
          >
            Login
          </Button>

          <Button onClick={logout} variant="secondary" className="w-full">
            Logout
          </Button>
        </div>

        {authToken && (
          <p className="text-center text-sm">
            Current Token:{' '}
            <code className="text-green-500 italic dark:text-green-400">
              {authToken.substring(0, 15)}...
            </code>
          </p>
        )}

        <div className="text-center">
          <Link
            to="/dashboard"
            className="text-primary text-sm font-medium transition-colors hover:underline hover:brightness-110"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="text-muted-foreground mt-6 border-t pt-6 text-center text-xs">
          <p>
            Auth Card &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
