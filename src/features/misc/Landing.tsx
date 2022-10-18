import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";

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
    <Box sx={{ background: "linear-gradient(#0099ff, #7106c3)", display: "flex", justifyContent: "center" }}>
      <Grid container direction="column" alignItems="center" justifyContent="center" height="100vh" maxWidth="800px">
        <Grid item xs={1}>
          <Typography variant="h1" fontSize="80px" fontWeight="bold" color="white">
            Devs Meetup
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" fontWeight="bold" color="white">
            一緒に開発する仲間を見つけよう
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleStart} size="large" sx={{ bgcolor: "#111", color: "#fff" }}>
            {isAuthenticated ? "開く" : "ログイン"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
