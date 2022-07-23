import { Typography } from "@mui/material";
import { VFC } from "react";
import { selectCurrentRoom } from "../../features/room/roomSlice";
import { Location } from "../../features/room/types";
import { useAppSelector } from "../../stores/hooks";

type Prop = {
  location: Location;
};

export const LocationName: VFC<Prop> = ({ location }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);

  return (
    <>
      {location === "room" && (
        <Typography variant="h6" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
          {currentRoom.entity.name}
        </Typography>
      )}
      {location === "profile" && (
        <Typography variant="h6" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
          プロフィール
        </Typography>
      )}
      {location === "discovery" && (
        <Typography variant="h6" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
          探す
        </Typography>
      )}
    </>
  );
};
