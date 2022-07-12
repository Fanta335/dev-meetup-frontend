import { Box } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentMessages } from "../messageSlice";
import { MessageItem } from "./MessageItem";

export const MessageBoard = memo(() => {
  const currentMessages = useAppSelector(selectCurrentMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [currentMessages]);

  return (
    <>
      <Box sx={{ mt: "70px" }}>
        {currentMessages.allIds.length === 0 ? (
          <p>send message.</p>
        ) : (
          currentMessages.allIds.map((messageId) => {
            return <MessageItem key={messageId} messageId={messageId} />;
          })
        )}
        <div ref={messagesEndRef} />
      </Box>
    </>
  );
});
