import { MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { VFC } from "react";

type Props = {
  handleClose: () => void;
};

export const ProfileButton: VFC<Props> = ({ handleClose }) => {
  return (
    <MenuItem component={Link} to="/app/profile" onClick={handleClose}>
      <AccountCircleIcon sx={{ mr: 1 }} />
      <Typography fontFamily="">プロフィール</Typography>
    </MenuItem>
  );
};
