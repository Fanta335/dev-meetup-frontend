import { MainLayout } from "../components/Layouts/MainLayout";
import { Dashboard } from "../features/misc/Dashboard";
import { Landing } from "../features/misc/Landing";

export const protectedRoutes = [
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Landing />,
  },
];
