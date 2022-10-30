import { Landing } from '../features/misc/routes/Landing';
import { NotFoundPage } from '../features/misc/routes/NotFoundPage';

export const commonRoutes = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
