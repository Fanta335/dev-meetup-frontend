import { VFC } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton: VFC = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log in</button>;
};

export default LoginButton;