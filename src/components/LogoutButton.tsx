import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { VFC } from "react";

const LogoutButton: VFC = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="contained" onClick={() => logout({ returnTo: window.location.origin })}>
      Log out
    </Button>
  );
};

export default LogoutButton;
