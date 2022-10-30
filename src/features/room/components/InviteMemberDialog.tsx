import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { createInviteLink, selectCurrentRoom, selectInvitation } from "../roomSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { BootstrapDialogTitle } from "../../../components/Elements/Dialog/BootstrapDialogTitle";

type Props = {
  open: boolean;
  handleCloseDialog: () => void;
};

export const InviteMemberDialog: FC<Props> = memo(({ open, handleCloseDialog }) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const invitation = useAppSelector(selectInvitation);
  const handleCreateInvitation = useCallback(async () => {
    const token = await getAccessTokenSilently();
    await dispatch(createInviteLink({ token, roomId: currentRoom.entity.id, secondsExpirationLifetime: 60 * 60 * 24 }));
  }, [currentRoom.entity.id, dispatch, getAccessTokenSilently]);

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
});
