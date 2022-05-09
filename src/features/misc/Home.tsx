import { useAuth0 } from "@auth0/auth0-react";
import { Auth0User } from "../auth/types";

export const Home = () => {
  const { user } = useAuth0<Auth0User>();

  return (
    <div>
      <h1>home page.</h1>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};
