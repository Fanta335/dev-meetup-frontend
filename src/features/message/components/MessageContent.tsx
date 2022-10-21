import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectMessageEdit } from "../messageSlice";
import { Message } from "../types";
import { EditMessageInputForm } from "./EditMessageInputForm";
import { MessageMarkdown } from "./MessageMarkdown";

type Props = {
  message: Message;
};

export const MessageContent: FC<Props> = memo(({ message }) => {
  const messageEdit = useAppSelector(selectMessageEdit);

  const isEditing = messageEdit.messageId === message.id && messageEdit.isEditing;
  const isEdited = message.createdAt !== message.updatedAt;

  return (
    <>
      <Box>
        {isEditing ? (
          <EditMessageInputForm message={message} />
        ) : (
          <>
            <MessageMarkdown markdown={message.content} />
          </>
        )}
        {isEdited && (
          <Typography variant="subtitle2" color="text.secondary">
            （編集済）
          </Typography>
        )}
      </Box>
    </>
  );
});
