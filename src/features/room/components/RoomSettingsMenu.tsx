import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { LeaveRoomButton } from "./LeaveRoomButton";
import { EditRoomProfileButton } from "./EditRoomProfileButton";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../roomSlice";
import { useAuth0 } from "@auth0/auth0-react";

const options = ["友達の招待"];

const ITEM_HEIGHT = 48;

export const RoomSettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth0();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = user?.[process.env.REACT_APP_API_NAMESPACE + "/mysqlUser"];
  console.log("current user: ", currentUser);
  const isOwner = currentRoom.owners.some((id) => id === currentUser.id);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleCloseMenu}>
            {option}
          </MenuItem>
        ))}
        {isOwner && <EditRoomProfileButton handleCloseMenu={handleCloseMenu} />}
        <LeaveRoomButton handleCloseMenu={handleCloseMenu} />
      </Menu>
    </div>
  );
};
