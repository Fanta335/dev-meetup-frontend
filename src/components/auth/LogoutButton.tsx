import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { FC } from "react";

type Props = {
  handleClose: () => void;
};

const LogoutButton: FC<Props> = ({ handleClose }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    handleClose();
    // clear the current user's access token.
    localStorage.removeItem("access_token");
    logout({ returnTo: window.location.origin });
  };

  return (
    <MenuItem onClick={handleLogout}>
      <LogoutIcon color="secondary" sx={{ mr: 1 }} />
      <Typography fontFamily="">ログアウト</Typography>
    </MenuItem>
  );
};

export default LogoutButton;
