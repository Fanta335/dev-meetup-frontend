import { useAuth0 } from "@auth0/auth0-react";
import { VFC } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const RouteAuthGuard: VFC<Props> = ({ component, redirect }) => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) {
    // return navigate(redirect, { state: { from: location }, replace: false });
    return <Navigate to={redirect} state={{ from: location }} replace={false} />;
  }

  return <>{component}</>;
};
