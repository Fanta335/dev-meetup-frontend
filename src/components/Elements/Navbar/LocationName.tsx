import { Tooltip, Typography, Zoom } from "@mui/material";
import { FC } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { selectCurrentRoom } from "../../../features/room/roomSlice";
import { useAppSelector } from "../../../stores/hooks";
import { Location } from "../../../features/room/types";

type Prop = {
  location: Location;
};

export const LocationName: FC<Prop> = ({ location }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);

  return (
    <>
      {location === "room" && (
        <Typography variant="h6" fontWeight="bold" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
          {currentRoom.entity.name}
        </Typography>
      )}
      {location === "room" && currentRoom.entity.isPrivate && (
        <Tooltip title="非公開" placement="bottom" arrow TransitionComponent={Zoom}>
          <LockIcon color="secondary" sx={{ ml: 2 }} />
        </Tooltip>
      )}
      {location === "profile" && (
        <Typography variant="h5" fontWeight="bold" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
          プロフィール
        </Typography>
      )}
      {location === "discovery" && (
        <Typography variant="h5" fontWeight="bold" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
          探す
        </Typography>
      )}
    </>
  );
};
