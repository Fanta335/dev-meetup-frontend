import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";

const RequireAuth: FC = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <div>{children}</div> : <p>Not authenticated. Please log in.</p>;
};

export default RequireAuth;
