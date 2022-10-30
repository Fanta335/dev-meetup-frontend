import { MenuItem, Typography } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { InviteMemberDialog } from './InviteMemberDialog';

type Props = {
  handleCloseMenu: () => void;
};

export const InviteMemberButton: FC<Props> = memo(({ handleCloseMenu }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    handleCloseMenu();
  }, [handleCloseMenu]);

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <PersonAddIcon color="secondary" sx={{ mr: 1 }} />
        <Typography fontFamily="">メンバーを招待</Typography>
      </MenuItem>
      <InviteMemberDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
});

InviteMemberButton.displayName = 'InviteMemberButton';
