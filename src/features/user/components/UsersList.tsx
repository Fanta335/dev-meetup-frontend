import { Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
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
            pl: 2,
            pt: 2,
          },
          justifyContent: "center",
        }}
        anchor="right"
        open={isRoomMemberDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Toolbar />
        <Typography variant="body1" color="text.secondary" fontWeight="bold">
          OWNER
        </Typography>
        <List sx={{ bgcolor: "background.paper" }}>
          {currentUsers.owners.map((id) => (
            <UserItem key={id} user={currentUsers.members.byIds[id]} />
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1" color="text.secondary" fontWeight="bold">
          MEMBER
        </Typography>
        <List sx={{ bgcolor: "background.paper" }}>
          {currentUsers.members.allIds.map((id) => {
            if (!currentUsers.owners.includes(id)) {
              return <UserItem key={id} user={currentUsers.members.byIds[id]} />;
            }
            return null;
          })}
        </List>
      </Drawer>
    </>
  );
};
