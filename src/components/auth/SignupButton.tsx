import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { VFC } from "react";

const SignupButton: VFC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="contained" onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
      Sign Up
    </Button>
  );
};

export default SignupButton;
