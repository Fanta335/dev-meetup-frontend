import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { createInviteLink, selectCurrentRoom, selectInvitation } from "../roomSlice";
import { useAuth0 } from "@auth0/auth0-react";

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

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
};

export const InviteMemberDialog: FC<Props> = ({ open, handleCloseDialog }) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const invitation = useAppSelector(selectInvitation);
  const handleCreateInvitation = async () => {
    const token = await getAccessTokenSilently();
    await dispatch(createInviteLink({ token, roomId: currentRoom.entity.id, secondsExpirationLifetime: 60 * 60 * 24 }));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth maxWidth="sm">
        <BootstrapDialogTitle id="invite-user-title" onClose={handleCloseDialog}>
          メンバーを招待する
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="invite-user-dialog-description" fontFamily="">
            招待リンクを作成してください。
          </DialogContentText>
          <TextField fullWidth placeholder="作成されていません" value={invitation ? invitation.url : ""} inputProps={{ readOnly: true }} />
        </DialogContent>
        <DialogActions>
          <Button color="success" variant="contained" onClick={handleCreateInvitation}>
            リンクを作成
          </Button>
          <Button
            onClick={() => {
              if (invitation !== null)
                navigator.clipboard.writeText(invitation.url).then(() => {
                  console.log(`copied url: ${invitation.url}`);
                });
            }}
            color="success"
            variant="contained"
          >
            コピー
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
