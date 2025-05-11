import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the global CSS styles
import '@/styles/index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from '@/components/ThemeProvider';
import useAuthToken from '@/store/auth';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    // Define the context for the router
    // This can be used to pass data or functions to the routes
    authentication: undefined!,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const authentication = useAuthToken();
  return <RouterProvider router={router} context={{ authentication }} />;
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="app-theme">
        <App />
      </ThemeProvider>
    </StrictMode>,
  );
}
