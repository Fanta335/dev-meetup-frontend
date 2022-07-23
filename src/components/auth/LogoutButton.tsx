import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem } from "@mui/material";
import { VFC } from "react";

const LogoutButton: VFC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    // clear the current user's access token.
    localStorage.removeItem("access_token");
    logout({ returnTo: window.location.origin });
  };

  return <MenuItem onClick={handleLogout}>Log out</MenuItem>;
};

export default LogoutButton;
