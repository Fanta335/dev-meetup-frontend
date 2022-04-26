import { ButtonGroup } from "@mui/material";
import { VFC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectMessageEdit } from "../messageSlice";
import { DeleteMessageButton } from "./DeleteMessageButton";
import { EditMessageButton } from "./EditMessageButton";
import { ReplyButton } from "./ReplyButton";
import { StopEditingButton } from "./StopEditingButton";

type Props = {
  messageId: number;
};

export const MessageMenu: VFC<Props> = ({ messageId }) => {
  const messageEdit = useAppSelector(selectMessageEdit);
  const isEditing = messageEdit.isEditing && messageId === messageEdit.messageId;

  return (
    <ButtonGroup size="small" aria-label="outlined primary button group" sx={{ px: 1 }}>
      {isEditing ? (
        <StopEditingButton />
      ) : (
        <div>
          <ReplyButton />
          <EditMessageButton messageId={messageId} />
          <DeleteMessageButton messageId={messageId} />
        </div>
      )}
    </ButtonGroup>
  );
};
