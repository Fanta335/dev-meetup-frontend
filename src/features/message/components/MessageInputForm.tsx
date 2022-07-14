import { Box, Button, Paper, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";
import { selectCurrentUsers } from "../../user/userSlice";
import { messageActions, selectCurrentMessages, selectMessageReply } from "../messageSlice";
import { StopReplyingButton } from "./StopReplyingButton";
import SendIcon from "@mui/icons-material/Send";

type FormInput = {
  message: string;
};

export const MessageInputForm = () => {
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentMessages = useAppSelector(selectCurrentMessages);
  const currentUsers = useAppSelector(selectCurrentUsers);
  const messageReply = useAppSelector(selectMessageReply);

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    dispatch(messageActions.sendMessage({ roomId: currentRoom.entity.id.toString(), content: content.message, parentId: messageReply.parentMessageId }));

    if (messageReply.isReplying) {
      dispatch(messageActions.endReplying());
    }

    reset();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Controller
              render={({ field }) => (
                <div>
                  {messageReply.isReplying && messageReply.parentMessageId && (
                    <Paper sx={{ pl: 3 }} elevation={0}>
                      {currentUsers.members.byIds[currentMessages.byIds[messageReply.parentMessageId].authorId]?.name} に返信中
                      <StopReplyingButton />
                    </Paper>
                  )}
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    inputRef={field.ref}
                    id="messageInputForm"
                    fullWidth
                    // multiline
                    autoComplete="off"
                    placeholder={`${currentRoom.entity.name} へメッセージを送信`}
                    sx={{ bgcolor: "#00000023", borderRadius: "5px" }}
                  />
                </div>
              )}
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
          </Box>
          <Button variant="contained" type="submit" sx={{ ml: 2 }} endIcon={<SendIcon />}>
            送信
          </Button>
        </Box>
      </form>
    </Box>
  );
};
