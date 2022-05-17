import { NotFoundPage } from "../components/Layouts/NotFoundPage";
import { Landing } from "../features/misc/Landing";

export const commonRoutes = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
