import { useAuth0 } from '@auth0/auth0-react';
import { MenuItem, Typography } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { Auth0User } from '../../auth/types';
import { removeMemberFromRoom, selectCurrentRoom } from '../roomSlice';
import { ConfirmLeavingDialog } from './ConfirmLeavingDialog';
import { getCurrentUser } from '../../user/utils/getCurrentUser';

type Props = {
  handleCloseMenu: () => void;
};

export const LeaveRoomButton: FC<Props> = memo(({ handleCloseMenu }: Props) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentUser = getCurrentUser(user);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLeave = useCallback(async () => {
    if (currentUser) {
      const token = await getAccessTokenSilently();
      await dispatch(removeMemberFromRoom({ token, roomId: currentRoom.entity.id }));
      navigate('/app/');
    }
  }, [currentRoom.entity.id, currentUser, dispatch, getAccessTokenSilently, navigate]);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    handleCloseMenu();
  }, [handleCloseMenu]);

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ color: '#e53e3e' }}>
        <LogoutIcon color="secondary" sx={{ mr: 1 }} />
        <Typography fontFamily="">部屋から脱退</Typography>
      </MenuItem>
      <ConfirmLeavingDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        handleLeave={handleLeave}
      />
    </>
  );
});

LeaveRoomButton.displayName = 'LeaveRoomButton';
