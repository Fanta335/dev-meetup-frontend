import { IconButton, ListItem, Tooltip, Zoom } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link } from "react-router-dom";

export const DiscoverRoomButton = () => {
  return (
    <Tooltip title="公開された部屋を探す" placement="right" arrow TransitionComponent={Zoom}>
      <ListItem button sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
        <IconButton aria-label="discover room" component={Link} to="/app/room-discovery" >
          <ExploreIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
};
