import { useAuth0 } from "@auth0/auth0-react";
import { ButtonGroup } from "@mui/material";
import { memo, VFC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";
import { selectCurrentMessages, selectMessageEdit } from "../messageSlice";
import { DeleteMessageButton } from "./DeleteMessageButton";
import { EditMessageButton } from "./EditMessageButton";
import { ReplyButton } from "./ReplyButton";
import { StopEditingButton } from "./StopEditingButton";

type Props = {
  messageId: number;
};

export const MessageMenu: VFC<Props> = memo(({ messageId }) => {
  const messageEdit = useAppSelector(selectMessageEdit);
  const isEditing = messageEdit.isEditing && messageId === messageEdit.messageId;

  // Check if current user is the author of this message.
  // Get current user id from auth0 context.
  const { user } = useAuth0<Auth0User>();
  const currentUser = getCurrentUser(user);

  // Get author id.
  const currentMessages = useAppSelector(selectCurrentMessages);
  const authorId = currentMessages.byIds[messageId].authorId;

  const isOwnMessage = authorId === currentUser?.id;

  return (
    <ButtonGroup size="small" aria-label="outlined primary button group" sx={{ px: 1 }} variant="contained" color='secondary'>
      {isEditing ? (
        <StopEditingButton />
      ) : (
        <div>
          <ReplyButton messageId={messageId} />
          {isOwnMessage && <EditMessageButton messageId={messageId} />}
          {isOwnMessage && <DeleteMessageButton messageId={messageId} />}
        </div>
      )}
    </ButtonGroup>
  );
});
