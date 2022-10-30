import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC, memo } from 'react';

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
  handleLeave: () => void;
};

export const ConfirmLeavingDialog: FC<Props> = memo(
  ({ open, handleCloseDialog, handleLeave }: Props) => {
    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">部屋から脱退</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            部屋から脱退しますが、本当によろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus color="secondary" variant="contained">
            キャンセル
          </Button>
          <Button onClick={handleLeave} color="error" variant="contained">
            脱退
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

ConfirmLeavingDialog.displayName = 'ConfirmLeavingDialog';
