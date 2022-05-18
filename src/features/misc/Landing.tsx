import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { ReactComponent as GoodTeam } from "../../assets/images/good_team.svg";

export const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      loginWithRedirect();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Grid container direction="column" alignItems="center" justifyContent="center" height="100vh">
        <Grid item md={6}>
          <Typography variant="h2">Dev Meetup</Typography>
        </Grid>
        <Grid item md={6}>
          <Button variant="contained" onClick={handleStart}>
          {isAuthenticated ? "開く" : "ログイン"}
          </Button>
        </Grid>
        <Grid item md={6}>
          <GoodTeam />
        </Grid>
      </Grid>
    </div>
  );
};
