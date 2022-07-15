import { MenuItem } from "@mui/material";
import { useState, VFC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmRoomDeletionDialog } from "./ConfirmRoomDeletionDialog";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteRoom, fetchAsyncGetBelongingRooms, selectCurrentRoom } from "../roomSlice";
import { useNavigate } from "react-router-dom";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";

type Props = {
  handleCloseMenu: () => void;
};

export const DeleteRoomButton: VFC<Props> = ({ handleCloseMenu }) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = getCurrentUser(user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const handleDelete = async () => {
    if (!currentUser) return;
    console.log("delete room.");
    const token = await getAccessTokenSilently();
    // First, delete the room.
    await dispatch(deleteRoom({ token, roomId: currentRoom.entity.id }));
    // Second, fetch latest belonging rooms.
    await dispatch(fetchAsyncGetBelongingRooms({ token, userId: currentUser.id.toString() }));

    handleCloseMenu();
    navigate("/app/");
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ color: "#e53e3e" }}>
        <DeleteIcon sx={{ mr: 1 }} />
        部屋の削除
      </MenuItem>
      <ConfirmRoomDeletionDialog open={open} handleCloseDialog={handleCloseDialog} handleDelete={handleDelete} />
    </>
  );
};
