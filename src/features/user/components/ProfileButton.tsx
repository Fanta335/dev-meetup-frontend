import { MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FC, memo } from 'react';

type Props = {
  handleClose: () => void;
};

export const ProfileButton: FC<Props> = memo(({ handleClose }: Props) => {
  return (
    <MenuItem component={Link} to="/app/profile" onClick={handleClose}>
      <AccountCircleIcon color="secondary" sx={{ mr: 1 }} />
      <Typography fontFamily="">プロフィール</Typography>
    </MenuItem>
  );
});

ProfileButton.displayName = 'ProfileButton';
