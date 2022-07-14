import { Drawer, List, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../userSlice";
import { UserItem } from "./UserItem";
import { roomActions, selectIsRoomMemberDrawerOpen } from "../../room/roomSlice";

export const UsersList = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  // console.log("current users: ", currentUsers);
  const isRoomMemberDrawerOpen = useAppSelector(selectIsRoomMemberDrawerOpen);
  const dispatch = useAppDispatch();
  const drawerWidth = "200px";

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    dispatch(roomActions.toggleRoomMemberDrawer({ open }));
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          justifyContent: "center",
        }}
        anchor="right"
        open={isRoomMemberDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Toolbar />
        <List sx={{ bgcolor: "background.paper" }}>
          {currentUsers.members.allIds.map((id) => (
            <UserItem key={id} user={currentUsers.members.byIds[id]} />
          ))}
        </List>
      </Drawer>
    </>
  );
};
