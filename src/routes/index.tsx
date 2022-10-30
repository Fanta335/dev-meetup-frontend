import { useRoutes } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const element = useRoutes([...protectedRoutes, ...commonRoutes]);

  return <>{element}</>;
};
