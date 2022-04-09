import { List } from "@mui/material";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../userSlice";
import { UserItem } from "./UserItem";

export const UsersList = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  console.log("currentusers: ", currentUsers);

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {currentUsers.members.allIds.map((id) => (
          <UserItem key={id} name={currentUsers.members.byIds[id].name} />
        ))}
      </List>
    </div>
  );
};
