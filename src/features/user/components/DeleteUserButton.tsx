import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectOwnRooms } from "../../room/roomSlice";
import { ConfirmOwnershipDialog } from "./ConfirmOwnershipDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";

export const DeleteUserButton = () => {
  const [openDeletion, setOpenDeletion] = useState(false);
  const [openOwnership, setOpenOwnership] = useState(false);
  const ownRooms = useAppSelector(selectOwnRooms);

  const handleClickOpen = useCallback(() => {
    if (ownRooms.allIds.length === 0) {
      setOpenDeletion(true);
    } else {
      setOpenOwnership(true);
    }
  }, [ownRooms.allIds]);

  const handleCloseDeleteUserDialog = useCallback(() => {
    setOpenDeletion(false);
  }, []);

  const handleCloseConfirmOwnershipDialog = useCallback(() => {
    setOpenOwnership(false);
  }, []);

  return (
    <>
      <Button onClick={handleClickOpen} variant="contained" color="error">
        アカウントを削除する
      </Button>
      <DeleteUserDialog open={openDeletion} handleCloseDialog={handleCloseDeleteUserDialog} />
      <ConfirmOwnershipDialog open={openOwnership} handleCloseDialog={handleCloseConfirmOwnershipDialog} />
    </>
  );
};
