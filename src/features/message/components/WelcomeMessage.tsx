import { Grid, Typography } from "@mui/material";
import { ReactComponent as WelcomeCat } from "../../../assets/images/welcome_cat.svg";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";

export const WelcomeMessage = () => {
  const currentRoom = useAppSelector(selectCurrentRoom);

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" height="80%">
        <WelcomeCat width="100%" />
        <Typography variant="h4" fontWeight="bold">
          {currentRoom.entity.name} へようこそ！
        </Typography>
        <Typography variant="subtitle1">メッセージを送信してメンバーと交流しよう。</Typography>
      </Grid>
    </>
  );
};
