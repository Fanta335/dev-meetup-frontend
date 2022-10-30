import { IconButton, ListItem, Tooltip, Typography, Zoom } from '@mui/material';
import { useCallback, useState } from 'react';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CreateRoomDialog } from './CreateRoomDialog';
import { useAppDispatch } from '../../../stores/hooks';
import { roomActions } from '../roomSlice';

export const CreateRoomButton = () => {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setSelectedFile(undefined);
    dispatch(roomActions.setRoomAvatarPreview({ url: null }));
    setDialogOpen(false);
  }, [dispatch]);

  const handleTooltipOpen = useCallback(() => {
    setTooltipOpen(true);
  }, []);

  const handleTooltipClose = useCallback(() => {
    setTooltipOpen(false);
  }, []);

  return (
    <Tooltip
      open={tooltipOpen}
      title={
        <Typography fontFamily="inherit" fontWeight="bold">
          部屋をつくる
        </Typography>
      }
      placement="right"
      arrow
      TransitionComponent={Zoom}
    >
      <ListItem button sx={{ display: 'flex', justifyContent: 'center', height: '50px' }}>
        <IconButton
          aria-label="create room"
          onClick={handleDialogOpen}
          onMouseEnter={handleTooltipOpen}
          onMouseLeave={handleTooltipClose}
          color="success"
        >
          <AddCircleOutlinedIcon sx={{ fontSize: '54px' }} />
        </IconButton>
        <CreateRoomDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </ListItem>
    </Tooltip>
  );
};
