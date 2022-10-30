import { Grid, Typography } from '@mui/material';
import { ReactComponent as Empty } from '../../../assets/images/empty.svg';

export const RoomNotDiscoveredImage = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Empty width="70%" />
      <Typography variant="h5">一致した結果はありませんでした。</Typography>
      <Typography variant="body1">検索語句を変えてみてください。</Typography>
    </Grid>
  );
};
