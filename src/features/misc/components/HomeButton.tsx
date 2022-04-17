import { IconButton, ListItem, Tooltip, Zoom } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { changeLocation } from "../../room/roomSlice";

export const HomeButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(changeLocation("home"));
  };

  return (
    <Tooltip title="ホーム" placement="right" arrow TransitionComponent={Zoom}>
      <ListItem button sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
        <IconButton aria-label="home" component={Link} to="/app" onClick={handleClick}>
          <HomeIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </ListItem>
    </Tooltip>
  );
};
