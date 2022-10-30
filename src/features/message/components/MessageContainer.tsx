import { Box } from '@mui/material';
import { Loading } from '../../../components/Elements/Loading/Loading';
import { useAppSelector } from '../../../stores/hooks';
import { selectCurrentRoomLoading } from '../../room/roomSlice';
import { InfiniteScrollMessage } from './InfiniteScrollMessage';
import { MessageInputForm } from './MessageInputForm';

export const MessageContainer = () => {
  const loading = useAppSelector(selectCurrentRoomLoading);

  return (
    <>
      {loading === 'pending' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ flexGrow: 1, pt: 1, px: 1, pb: 8 }}>
            <InfiniteScrollMessage />
          </Box>
          <Box sx={{ width: '100%', px: 1, pb: 3, bgcolor: 'background.default' }}>
            <MessageInputForm />
          </Box>
        </Box>
      )}
    </>
  );
};
