import { Grid, Typography } from '@mui/material';
import { ReactComponent as QuestionMark } from '../../../assets/images/question.svg';

export const ForbiddenPage = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="80%"
      spacing={4}
    >
      <Grid item>
        <QuestionMark />
      </Grid>
      <Grid container item justifyContent="center">
        <Typography variant="h5" fontWeight="bold">
          部屋がありません。
        </Typography>
        <Typography variant="subtitle1">
          部屋に入るための権限がない、あるいは部屋そのものが存在しないかのどちらかでしょう。
        </Typography>
      </Grid>
    </Grid>
  );
};
