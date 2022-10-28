import { MenuItem, Typography } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { InviteMemberDialog } from "./InviteMemberDialog";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {
  handleCloseMenu: () => void;
};

export const InviteMemberButton: FC<Props> = memo(({ handleCloseMenu }) => {
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
        <PersonAddIcon color="secondary" sx={{ mr: 1 }} />
        <Typography fontFamily="">メンバーを招待</Typography>
      </MenuItem>
      <InviteMemberDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
});
