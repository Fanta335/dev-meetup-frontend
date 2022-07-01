import { Box } from "@mui/material";
import { useEffect } from "react";
import { Profile } from "../../components/Profile";
import { useAppDispatch } from "../../stores/hooks";
import { roomActions } from "../room/roomSlice";

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(roomActions.changeLocation("home"));
  }, [dispatch]);

  return (
    <Box sx={{pt: 12, px: 4, bgcolor: '#888'}}>
      <Profile />
    </Box>
  );
};
