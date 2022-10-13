import { Box, TextField } from "@mui/material";
import { FC } from "react";
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

export const EditMessageInputForm: FC<Props> = ({ message }) => {
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    dispatch(messageActions.updateMessage({ roomId: currentRoom.entity.id.toString(), messageId: message.id, content: content.message }));
    dispatch(messageActions.endEdit());

    reset();
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
                  inputRef={field.ref}
                  id="messageInputForm"
                  fullWidth
                  // multiline
                  autoComplete="off"
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
};
