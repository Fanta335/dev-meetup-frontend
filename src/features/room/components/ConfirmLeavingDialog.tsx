import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { VFC } from "react";

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
  handleLeave: () => void;
};

export const ConfirmLeavingDialog: VFC<Props> = ({ open, handleCloseDialog, handleLeave }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"メッセージを削除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">部屋から脱退します。よろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            キャンセル
          </Button>
          <Button onClick={handleLeave} color="error" variant="contained">脱退</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
