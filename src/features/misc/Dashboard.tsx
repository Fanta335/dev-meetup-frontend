import { useAuth0 } from "@auth0/auth0-react";

export const Dashboard = () => {
  const { user } = useAuth0();
  if(user) console.log(user);
  return (
    <div>
      <h1>Dashboard page.</h1>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};
