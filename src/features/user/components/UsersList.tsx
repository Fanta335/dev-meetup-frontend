import { Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { selectCurrentUsers } from '../userSlice';
import { UserItem } from './UserItem';
import { roomActions, selectIsRoomMemberDrawerOpen } from '../../room/roomSlice';

export const UsersList = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  const isRoomMemberDrawerOpen = useAppSelector(selectIsRoomMemberDrawerOpen);
  const dispatch = useAppDispatch();
  const drawerWidth = '200px';

  const toggleDrawer = (open: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      dispatch(roomActions.toggleRoomMemberDrawer({ open }));
    };
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          pt: 2,
        },
        justifyContent: 'center',
      }}
      anchor="right"
      open={isRoomMemberDrawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Toolbar />
      <Typography variant="subtitle1" color="text.secondary" fontWeight="bold" pl={2}>
        OWNER
      </Typography>
      <List>
        {currentUsers.owners.map((id) => {
          return <UserItem key={id} user={currentUsers.members.byIds[id]} />;
        })}
      </List>
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle1" color="text.secondary" fontWeight="bold" pl={2}>
        MEMBER
      </Typography>
      <List>
        {currentUsers.members.allIds.map((id) => {
          if (!currentUsers.owners.includes(id)) {
            return <UserItem key={id} user={currentUsers.members.byIds[id]} />;
          }
          return null;
        })}
      </List>
    </Drawer>
  );
};
