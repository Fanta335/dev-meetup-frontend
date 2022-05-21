import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem } from "@mui/material";
import { useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Auth0User } from "../../auth/types";
import { removeMemberFromRoom, selectCurrentRoom } from "../roomSlice";
import { ConfirmLeavingDialog } from "./ConfirmLeavingDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import { getCurrentUser } from "../../user/utils/getCurrentUser";

type Props = {
  handleCloseMenu: () => void;
};

export const LeaveRoomButton: VFC<Props> = ({ handleCloseMenu }) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentUser = getCurrentUser(user);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLeave = async () => {
    if (currentUser) {
      const token = await getAccessTokenSilently();
      await dispatch(removeMemberFromRoom({ token, userId: currentUser.id, roomId: currentRoom.entity.id }));
    }

    handleCloseMenu();
    navigate("/app/room-discovery");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    handleCloseMenu();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ color: "#e53e3e" }}>
        <LogoutIcon sx={{ mr: 1 }} />
        部屋から脱退
      </MenuItem>
      <ConfirmLeavingDialog open={open} handleCloseDialog={handleCloseDialog} handleLeave={handleLeave} />
    </>
  );
};
