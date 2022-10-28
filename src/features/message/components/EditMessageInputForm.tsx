import { Box, TextField } from "@mui/material";
import { FC, memo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";
import { messageActions } from "../messageSlice";
import { Message } from "../types";

type Props = {
  message: Message;
};

type FormInput = {
  message: string;
};

export const EditMessageInputForm: FC<Props> = memo(({ message }) => {
  const [typing, setTyping] = useState(false);
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    dispatch(messageActions.updateMessage({ roomId: currentRoom.entity.id.toString(), messageId: message.id, content: content.message }));
    dispatch(messageActions.endEdit());
    console.log("submit");
    reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (typing) {
      event.preventDefault();
    } else if (event.shiftKey && event.key === "Enter") {
      return;
    } else if (event.key === "Enter") {
      handleSubmit(onSubmit)(event);
      event.preventDefault();
    } else if (event.key === "Escape") {
      dispatch(messageActions.endEdit());
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Controller
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={() => setTyping(true)}
                  onCompositionEnd={() => setTyping(false)}
                  inputRef={field.ref}
                  id="messageInputForm"
                  fullWidth
                  multiline
                  autoComplete="off"
                  autoFocus
                />
              )}
              name="message"
              control={control}
              defaultValue={message.content}
              rules={{ required: true }}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
});
