import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { VFC } from "react";

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
  handleDelete: () => void;
};

export const ConfirmRoomDeletionDialog: VFC<Props> = ({ open, handleCloseDialog, handleDelete }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"部屋を削除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontFamily="">部屋を削除します。削除した部屋は、二度と戻せません！本当によろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus color="secondary" variant="contained">
            キャンセル
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
