import { useAuth0 } from "@auth0/auth0-react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { FC, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { removeOwnerToRoom, selectCurrentRoom } from "../../room/roomSlice";
import { User } from "../types";

type Props = {
  user: User;
  handleClose: () => void;
};

export const RemoveOwnerPopoverContent: FC<Props> = memo(({ user, handleClose }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const handleRemoveOwner = async () => {
    const token = await getAccessTokenSilently();
    await dispatch(removeOwnerToRoom({ token, userId: user.id, roomId: currentRoom.entity.id }));
  };

  return (
    <>
      <Grid container direction="column" p={2}>
        <Typography variant="body1" fontWeight="bold">
          {user.name}をオーナーから削除しますか？
        </Typography>
        <Typography variant="body2" color="text.secondary">
          少なくとも、一人はオーナーでなければなりません。
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant="contained" color="error" onClick={handleRemoveOwner} disabled={currentRoom.entity.owners.length === 1}>
            オーナーから削除
          </Button>
        </Grid>
      </Grid>
    </>
  );
});
