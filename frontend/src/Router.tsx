import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import ProtectedLayout from "./layouts/protected-layout";
import DashboardPage from "./routes/dashboard";
import Home from "./routes/home";
import RootLayout from "./layouts/root-layout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      {
        element: <ProtectedLayout />,
        path: "dashboard",
        children: [{ path: "/dashboard", element: <DashboardPage /> }],
      },
    ],
  },
]);

const BrowserRouter = () => <RouterProvider router={router} />;

export default BrowserRouter;
