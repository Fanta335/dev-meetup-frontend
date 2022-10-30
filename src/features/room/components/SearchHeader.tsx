import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { SearchBox } from './SearchBox';

export const SearchHeader = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '300px',
        width: '100%',
        my: 3,
        mx: 5,
      }}
    >
      <CardContent
        sx={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={3} sx={{ width: '100%', maxWidth: '600px' }} alignItems="center">
          <Grid item>
            <Typography variant="h5" fontWeight="bold">
              公開された部屋から探す
            </Typography>
            <Typography variant="subtitle1">一緒に開発する仲間を見つけよう</Typography>
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <SearchBox />
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};
