import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleDelelte: () => void;
};

export const ConfirmDeletionDialog: FC<Props> = ({ open, handleClose, handleDelelte }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"メッセージを削除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">メッセージを削除します。よろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            キャンセル
          </Button>
          <Button onClick={handleDelelte} color="error" variant="contained">削除</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
