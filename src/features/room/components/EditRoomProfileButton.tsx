import { MenuItem, Typography } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { EditRoomProfileDialog } from "./EditRoomProfileDialog";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  handleCloseMenu: () => void;
};

export const EditRoomProfileButton: FC<Props> = memo(({ handleCloseMenu }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    handleCloseMenu();
  }, [handleCloseMenu]);

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <SettingsIcon color="secondary" sx={{ mr: 1 }} /> <Typography fontFamily="">部屋の設定</Typography>
      </MenuItem>
      <EditRoomProfileDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
});
