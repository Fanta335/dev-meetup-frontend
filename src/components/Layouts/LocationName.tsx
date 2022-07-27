import { Tooltip, Typography, Zoom } from "@mui/material";
import { VFC } from "react";
import { selectCurrentRoom } from "../../features/room/roomSlice";
import { Location } from "../../features/room/types";
import { useAppSelector } from "../../stores/hooks";
import LockIcon from "@mui/icons-material/Lock";

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
      {location === "room" && currentRoom.entity.isPrivate && (
        <Tooltip title="非公開" placement="bottom" arrow TransitionComponent={Zoom}>
          <LockIcon sx={{ ml: 2 }} />
        </Tooltip>
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
