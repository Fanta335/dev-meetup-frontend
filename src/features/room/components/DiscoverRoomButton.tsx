import { IconButton, ListItem, Tooltip, Zoom } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { changeLocation } from "../roomSlice";

export const DiscoverRoomButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(changeLocation("discovery"));
  };

  return (
    <Tooltip title="公開された部屋を探す" placement="right" arrow TransitionComponent={Zoom}>
      <ListItem button sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
        <IconButton aria-label="discover room" component={Link} to="/app/room-discovery" onClick={handleClick}>
          <ExploreIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
};
