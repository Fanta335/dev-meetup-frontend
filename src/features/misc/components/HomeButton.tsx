import { IconButton, ListItem, Tooltip, Zoom } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export const HomeButton = () => {
  return (
    <Tooltip title="ホーム" placement="right" arrow TransitionComponent={Zoom}>
      <ListItem button sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
        <IconButton aria-label="home" component={Link} to="/app">
          <HomeIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
};
