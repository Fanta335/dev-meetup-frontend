import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    // clear the current user's access token.
    localStorage.removeItem("access_token");
    logout({ returnTo: window.location.origin });
  };

  return <MenuItem onClick={handleLogout}><LogoutIcon sx={{mr: 1}} />ログアウト</MenuItem>;
};

export default LogoutButton;
