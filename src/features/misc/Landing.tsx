import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import LogoutButton from "../../components/auth/LogoutButton";

export const Landing = () => {
  const { isLoading } = useAuth0();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

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
      <Typography>Landing page</Typography>
      <Button variant="contained" onClick={handleStart}>
        Get Started!!
      </Button>
      <LogoutButton />
      <p>{isAuthenticated ? "login!" : "logout"}</p>
    </div>
  );
};
