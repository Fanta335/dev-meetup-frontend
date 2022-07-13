import { Button, Drawer, List, Toolbar } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../userSlice";
import { UserItem } from "./UserItem";
import PeopleIcon from "@mui/icons-material/People";
import { ShowRoomMemberDrawerButton } from "./ShowRoomMemberDrawerButton";

export const UsersList = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  // console.log("current users: ", currentUsers);
  const [isOpen, setDrawerOpen] = useState(false);
  const drawerWidth = "200px";

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <ShowRoomMemberDrawerButton toggleDrawer={toggleDrawer} />
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
        open={isOpen}
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
