import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Profile } from "../user/components/Profile";
import { useAppDispatch } from "../../stores/hooks";
import { roomActions } from "../room/roomSlice";

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(roomActions.changeLocation("profile"));
  }, [dispatch]);

  return (
    <Grid container sx={{ pt: 12, px: 4 }} justifyContent="center">
      <Profile />
    </Grid>
  );
};
