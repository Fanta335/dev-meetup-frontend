import { Drawer, List, Toolbar } from "@mui/material";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../userSlice";
import { UserItem } from "./UserItem";

export const UsersList = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  console.log("current users: ", currentUsers);

  const drawerWidth = "200px";

  return (
    // <div>
    //   <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
    //     {currentUsers.members.allIds.map((id) => (
    //       <UserItem key={id} name={currentUsers.members.byIds[id].name} />
    //     ))}
    //   </List>
    // </div>
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
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <List sx={{ bgcolor: "background.paper" }}>
        {currentUsers.members.allIds.map((id) => (
          <UserItem key={id} name={currentUsers.members.byIds[id].name} />
        ))}
      </List>
    </Drawer>
  );
};
