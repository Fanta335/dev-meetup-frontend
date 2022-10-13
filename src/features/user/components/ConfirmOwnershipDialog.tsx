import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

export type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

const BootstrapDialogTitle: FC<DialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

type ConfirmOwnershipDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

export const ConfirmOwnershipDialog: FC<ConfirmOwnershipDialogProps> = ({ open, handleCloseDialog }) => {
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
};
