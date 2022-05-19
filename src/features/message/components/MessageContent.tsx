import { Box, Typography } from "@mui/material";
import { memo, VFC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectMessageEdit } from "../messageSlice";
import { Message } from "../types";
import { EditMessageInputForm } from "./EditMessageInputForm";

type Props = {
  message: Message;
};

export const MessageContent: VFC<Props> = memo(({ message }) => {
  const messageEdit = useAppSelector(selectMessageEdit);

  const isEditing = messageEdit.messageId === message.id && messageEdit.isEditing;
  const isEdited = message.createdAt !== message.updatedAt;

  return (
    <>
      <Box>
        {isEditing ? (
          <EditMessageInputForm message={message} />
        ) : (
          <div>
            <Typography variant="body1">{message.content}</Typography>
          </div>
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
