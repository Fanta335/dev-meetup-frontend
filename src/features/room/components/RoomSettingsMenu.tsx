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
import { getCurrentUser } from "../../user/utils/getCurrentUser";
import { Auth0User } from "../../auth/types";
import { DeleteRoomButton } from "./DeleteRoomButton";

const options = ["友達の招待"];

const ITEM_HEIGHT = 48;

export const RoomSettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth0<Auth0User>();

  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentUser = getCurrentUser(user);
  const isOwner = currentRoom.entity.owners.some((id) => id === currentUser?.id);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
        <MoreVertIcon color="secondary" />
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
        {isOwner && <DeleteRoomButton handleCloseMenu={handleCloseMenu} />}
        {!isOwner && <LeaveRoomButton handleCloseMenu={handleCloseMenu} />}
      </Menu>
    </div>
  );
};
