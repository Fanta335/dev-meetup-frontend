import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { VFC } from "react";
import { SearchedRoom } from "../types";

type Props = {
  room: SearchedRoom;
};

export const MediumRoomCard: VFC<Props> = ({ room }) => {
  return (
    <Card sx={{ my: 3 }}>
      <CardActionArea>
        <CardHeader avatar={<Avatar variant="rounded"></Avatar>} title={<Typography variant="subtitle1">{room.name}</Typography>} />
        <CardContent>
          <Typography variant="body1">{room.description}</Typography>
        </CardContent>
        <Grid container justifyContent="flex-end" sx={{ pr: 2, pb: 2 }}>
          <Grid item>
            <PersonIcon color="action" />
          </Grid>
          <Grid item>
            <Typography>{room.numOfMembers}人</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
