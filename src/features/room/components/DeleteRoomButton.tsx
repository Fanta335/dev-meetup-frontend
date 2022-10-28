import { MenuItem, Typography } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmRoomDeletionDialog } from "./ConfirmRoomDeletionDialog";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteRoom, selectCurrentRoom } from "../roomSlice";
import { useNavigate } from "react-router-dom";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";

type Props = {
  handleCloseMenu: () => void;
};

export const DeleteRoomButton: FC<Props> = memo(({ handleCloseMenu }) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = getCurrentUser(user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    handleCloseMenu();
  }, [handleCloseMenu]);

  const handleDelete = useCallback(async () => {
    if (!currentUser) return;
    console.log("delete room.");
    const token = await getAccessTokenSilently();
    await dispatch(deleteRoom({ token, roomId: currentRoom.entity.id }));

    handleCloseMenu();
    navigate("/app/");
  }, [currentRoom.entity.id, currentUser, dispatch, getAccessTokenSilently, handleCloseMenu, navigate]);

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ color: "#e53e3e" }}>
        <DeleteIcon sx={{ mr: 1 }} />
        <Typography fontFamily="">部屋の削除</Typography>
      </MenuItem>
      <ConfirmRoomDeletionDialog open={open} handleCloseDialog={handleCloseDialog} handleDelete={handleDelete} />
    </>
  );
});
