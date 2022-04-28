import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentMessages } from "../messageSlice";
import { MessageItem } from "./MessageItem";

export const MessageBoard = () => {
  const currentMessages = useAppSelector(selectCurrentMessages);
  // console.log("current users: ", currentUsers);
  // console.log("current messages: ", currentMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [currentMessages]);

  return (
    <>
      <Box sx={{ bgcolor: "khaki", mt: "70px" }}>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {currentMessages.allIds[0] !== 0 &&
            currentMessages.allIds.map((messageId) => (
              <li key={messageId}>
                <MessageItem messageId={messageId} />
              </li>
            ))}
        </ul>
        <div ref={messagesEndRef} />
      </Box>
    </>
  );
};
