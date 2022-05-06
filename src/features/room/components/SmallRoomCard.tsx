import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import { VFC } from "react";
import { SearchedRoom } from "../types";

type Props = {
  room: SearchedRoom;
};

export const SmallRoomCard: VFC<Props> = ({ room }) => {
  return (
    <Card sx={{ m: 1 }}>
      <CardActionArea>
        <CardHeader avatar={<Avatar variant="rounded"></Avatar>} title={<Typography variant="subtitle1">{room.name}</Typography>} />
        <CardContent>
          <Typography variant="body1">{room.description}</Typography>
        </CardContent>
        <Typography sx={{ textAlign: "end", pr: 2, pb: 2 }}>{room.numOfMembers}人</Typography>
      </CardActionArea>
    </Card>
  );
};
