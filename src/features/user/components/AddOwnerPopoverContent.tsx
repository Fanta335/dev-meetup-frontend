import { useAuth0 } from "@auth0/auth0-react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { addOwnerToRoom, selectCurrentRoom } from "../../room/roomSlice";
import { User } from "../types";

type Props = {
  user: User;
  handleClose: () => void;
};

export const AddOwnerPopoverContent: FC<Props> = memo(({ user, handleClose }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const handleAddOwner = useCallback(async () => {
    const token = await getAccessTokenSilently();
    await dispatch(addOwnerToRoom({ token, userId: user.id, roomId: currentRoom.entity.id }));
  }, [getAccessTokenSilently, dispatch, currentRoom.entity.id, user.id]);

  return (
    <>
      <Grid container direction="column" p={2}>
        <Typography variant="body1" fontWeight="bold">
          {user.name}をオーナーに追加しますか？
        </Typography>
        <Typography variant="body2" color="text.secondary">
          オーナーは部屋の全ての管理権限を持ちます。
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant="contained" color="success" onClick={handleAddOwner}>
            オーナーに追加
          </Button>
        </Grid>
      </Grid>
    </>
  );
});
