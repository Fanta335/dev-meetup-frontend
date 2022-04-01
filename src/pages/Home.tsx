import { useAuth0 } from "@auth0/auth0-react";
import { VFC } from "react";

const Home: VFC = () => {
  const { isAuthenticated } = useAuth0();

  return <p>{isAuthenticated ? 'login!' : 'logout'}</p>;
};

export default Home;
