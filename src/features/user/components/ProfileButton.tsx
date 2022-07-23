import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const ProfileButton = () => {
  return (
    <MenuItem component={Link} to="/app/profile">
      <AccountCircleIcon sx={{ mr: 1 }} />
      プロフィール
    </MenuItem>
  );
};
