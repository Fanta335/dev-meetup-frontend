import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>home page.</h1>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};
