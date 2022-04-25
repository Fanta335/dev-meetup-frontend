import { Box, Typography } from "@mui/material";
import { VFC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectMessageEdit } from "../messageSlice";
import { Message } from "../types";
import { EditMessageInputForm } from "./EditMessageInputForm";

type Props = {
  message: Message;
};

export const MessageContent: VFC<Props> = ({ message }) => {
  const messageEdit = useAppSelector(selectMessageEdit);

  const isEditing = Number(messageEdit.messageId) === message.id && messageEdit.isEditing;
  const isEdited = message.createdAt !== message.updatedAt;

  return (
    <>
      <Box>
        {isEditing ? (
          <EditMessageInputForm message={message} />
        ) : (
          <Typography variant="body1" component="h5">
            {message.content}
          </Typography>
        )}
      </Box>
    </>
  );
};
