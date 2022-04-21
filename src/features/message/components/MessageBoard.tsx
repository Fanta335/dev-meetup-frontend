import { Box } from "@mui/material";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";
import { selectCurrentMessages } from "../messageSlice";

export const MessageBoard = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  const currentMessages = useAppSelector(selectCurrentMessages);
  console.log("current users: ", currentUsers);

  return (
    <>
      <Box sx={{ bgcolor: "khaki"}}>
        <ul>
          {currentMessages.allIds[0] !== "0" &&
            currentMessages.allIds.map((messageId) => (
              <li key={messageId}>
                <strong>{currentUsers.members.byIds[currentMessages.byIds[messageId].authorId.toString()].name}</strong>
                {": "}
                <span>{currentMessages.byIds[messageId].content}</span>
              </li>
            ))}
        </ul>
      </Box>
    </>
  );
};
