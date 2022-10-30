import { IconButton, ListItem, Tooltip, Typography, Zoom } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import { Link } from 'react-router-dom';

export const DiscoverRoomButton = () => {
  return (
    <Tooltip
      title={
        <Typography fontFamily="inherit" fontWeight="bold">
          部屋を探す
        </Typography>
      }
      placement="right"
      arrow
      TransitionComponent={Zoom}
    >
      <ListItem button sx={{ display: 'flex', justifyContent: 'center', height: '50px' }}>
        <IconButton aria-label="discover room" component={Link} to="/app/" color="success">
          <ExploreIcon sx={{ fontSize: '54px' }} />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
};
