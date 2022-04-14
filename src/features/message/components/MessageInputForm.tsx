import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";
import { postMessage } from "../messageSlice";

type FormInput = {
  message: string;
};

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

export const MessageInputForm = () => {
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    const token = await getAccessTokenSilently();

    const socket = io(serverUrl, {
      auth: { token: token },
    });
    console.log("data", content);
    socket.emit("messageToServer", content);

    const createMessageDTO = {
      content: content.message,
      roomId: currentRoom.id,
    };
    await dispatch(postMessage({ token, createMessageDTO }));

    reset();
  };
  return (
    <>
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
    </>
  );
};
