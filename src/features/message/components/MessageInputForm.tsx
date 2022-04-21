import { Box, Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";
import { messageActions } from "../messageSlice";

type FormInput = {
  message: string;
};

export const MessageInputForm = () => {
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    dispatch(messageActions.sendMessage({ roomId: currentRoom.id.toString(), content: content.message }));

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
              defaultValue=""
              rules={{ required: true }}
            />
          </Box>
          <Button variant="contained" type="submit" sx={{ ml: 2 }}>
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};
