import { Grid, Typography } from "@mui/material";
import { ReactComponent as NotFound } from "../../assets/images/page_not_found.svg";

export const NotFoundPage = () => {
  return (
    <>
      <Grid container direction='column' justifyContent="center" alignItems='center' height='100vh'>
        <Typography variant="h4">ページが見つかりませんでした。</Typography>
        <NotFound width='50%' />
      </Grid>
    </>
  );
};
