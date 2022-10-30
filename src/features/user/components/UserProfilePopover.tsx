import { Popover } from '@mui/material';
import { FC, memo } from 'react';
import { useAppSelector } from '../../../stores/hooks';
import { selectCurrentRoom } from '../../room/roomSlice';
import { User } from '../types';
import { selectCurrentUser } from '../userSlice';
import { AddOwnerPopover } from './AddOwnerPopover';
import { RemoveOwnerPopover } from './RemoveOwnerPopover';
import { UserProfilePopoverContent } from './UserProfilePopoverContent';

type Props = {
  user: User;
  open: boolean;
  anchorEl: (EventTarget & Element) | null;
  handleClose: () => void;
};

export const UserProfilePopover: FC<Props> = memo(
  ({ user, open, anchorEl, handleClose }: Props) => {
    const id = open ? 'simple-popover' : undefined;
    const currentRoom = useAppSelector(selectCurrentRoom);
    const currentUser = useAppSelector(selectCurrentUser);
    const isOwner = currentRoom.entity.owners.includes(user.id);
    const isCurrentUserOwner = currentRoom.entity.owners.includes(currentUser.id);

    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ style: { width: '300px' } }}
      >
        <UserProfilePopoverContent user={user} />
        {isCurrentUserOwner && isOwner && <RemoveOwnerPopover user={user} />}
        {isCurrentUserOwner && !isOwner && <AddOwnerPopover user={user} />}
      </Popover>
    );
  }
);

UserProfilePopover.displayName = 'UserProfilePopover';
