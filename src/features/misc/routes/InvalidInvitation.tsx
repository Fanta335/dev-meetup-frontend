import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Moonlight } from '../../../assets/images/moonlight.svg';

export const InvalidInvitation = () => {
  return (
    <Card
      sx={{
        width: 425,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Moonlight width="200px" />
      <CardContent>
        <Typography variant="h4" component="div" fontWeight="bold" textAlign="center">
          招待は無効です
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          招待の有効期限が切れているか、部屋に参加できる状態ではないかもしれません。
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" component={Link} to="/app/">
          Homeに戻る
        </Button>
      </CardActions>
    </Card>
  );
};
