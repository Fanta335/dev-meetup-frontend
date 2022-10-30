import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, FC, memo, useCallback } from 'react';
import { AddOwnerPopoverContent } from './AddOwnerPopoverContent';
import { User } from '../types';

type Props = {
  user: User;
};

export const AddOwnerPopover: FC<Props> = memo(({ user }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'add-owner-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2, ml: 2 }}
      >
        オーナーに追加
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <AddOwnerPopoverContent user={user} handleClose={handleClose} />
      </Popover>
    </>
  );
});

AddOwnerPopover.displayName = 'AddOwnerPopover';
