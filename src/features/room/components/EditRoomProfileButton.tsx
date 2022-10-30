import { MenuItem, Typography } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { EditRoomProfileDialog } from './EditRoomProfileDialog';

type Props = {
  handleCloseMenu: () => void;
};

export const EditRoomProfileButton: FC<Props> = memo(({ handleCloseMenu }: Props) => {
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
        <SettingsIcon color="secondary" sx={{ mr: 1 }} />{' '}
        <Typography fontFamily="">部屋の設定</Typography>
      </MenuItem>
      <EditRoomProfileDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
});

EditRoomProfileButton.displayName = 'EditRoomProfileButton';
