import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState, FC, memo, useCallback } from 'react';
import { User } from '../types';
import { RemoveOwnerPopoverContent } from './RemoveOwnerPopoverContent';

type Props = {
  user: User;
};

export const RemoveOwnerPopover: FC<Props> = memo(({ user }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'remove-owner-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        startIcon={<RemoveCircleIcon />}
        sx={{ mb: 2, ml: 2 }}
      >
        オーナーから削除
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
        <RemoveOwnerPopoverContent user={user} handleClose={handleClose} />
      </Popover>
    </>
  );
});

RemoveOwnerPopover.displayName = 'RemoveOwnerPopover';
