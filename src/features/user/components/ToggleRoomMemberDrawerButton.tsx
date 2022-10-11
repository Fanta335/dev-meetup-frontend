import { IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { roomActions, selectIsRoomMemberDrawerOpen } from "../../room/roomSlice";

export const ToggleRoomMemberDrawerButton = () => {
  const dispatch = useAppDispatch();
  const isRoomMemberDrawerOpen = useAppSelector(selectIsRoomMemberDrawerOpen);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    dispatch(roomActions.toggleRoomMemberDrawer({ open }));
  };
  return (
    <IconButton onClick={toggleDrawer(!isRoomMemberDrawerOpen)}>
      <PeopleIcon fontSize="large" />
    </IconButton>
  );
};
