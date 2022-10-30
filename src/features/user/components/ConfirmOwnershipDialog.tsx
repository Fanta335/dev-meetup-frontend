import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { FC, memo } from "react";
import { BootstrapDialogTitle } from "../../../components/Elements/Dialog/BootstrapDialogTitle";

type ConfirmOwnershipDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

export const ConfirmOwnershipDialog: FC<ConfirmOwnershipDialogProps> = memo(({ open, handleCloseDialog }) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
      <BootstrapDialogTitle id="delete user" onClose={handleCloseDialog}>
        部屋を所有しています！
      </BootstrapDialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="text.secondary">
          アカウントを削除する前に、あなたの所有する全ての部屋の所有権を譲渡する必要があります。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" color="success" onClick={handleCloseDialog}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
});
