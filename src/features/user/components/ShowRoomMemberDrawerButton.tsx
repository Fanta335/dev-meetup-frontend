import { Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { roomActions, selectIsRoomMemberDrawerOpen } from "../../room/roomSlice";

export const ShowRoomMemberDrawerButton = () => {
  const dispatch = useAppDispatch();
  const isRoomMemberDrawerOpen = useAppSelector(selectIsRoomMemberDrawerOpen);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    dispatch(roomActions.toggleRoomMemberDrawer({ open }));
  };
  return (
    <Button onClick={toggleDrawer(!isRoomMemberDrawerOpen)} sx={{}} startIcon={<PeopleIcon />} variant="contained">
      メンバー
    </Button>
  );
};
