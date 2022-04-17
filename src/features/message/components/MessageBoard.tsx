import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";
import { selectCurrentMessages } from "../messageSlice";

export const MessageBoard = () => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  const currentMessages = useAppSelector(selectCurrentMessages);
  console.log("current users: ", currentUsers);
  const { getAccessTokenSilently } = useAuth0();

  // useEffect(() => {
  //   const token = getAccessTokenSilently();

  //   const socket = io("http://localhost:3000", {
  //     auth: { token: token },
  //   });
  //   socket.on("messageToClient", (content) => console.log('content from server: ', content));
  // }, [getAccessTokenSilently, currentMessages]);

  // const getMessageToClient = async () => {
  //   const token = await getAccessTokenSilently();

  //   const socket = io("http://localhost:3000", {
  //     auth: { token: token },
  //   });
  //   console.log("check.");
  //   socket.on("messageToClient", (content) => console.log("content from server: ", content));
  // };

  // getMessageToClient();

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
