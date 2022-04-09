import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import { FC, VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../../stores/hooks";
import { postRoom } from "../roomSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

const BootstrapDialogTitle: FC<DialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export type CreateToomDialogProps = {
  open: boolean;
  handleClose: () => void;
};

type FormInput = {
  name: string;
};

export const CreateRoomDialog: VFC<CreateToomDialogProps> = ({ open, handleClose }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);

    const token = await getAccessTokenSilently();
    const createRoomDTO = data;
    await dispatch(postRoom({ token, createRoomDTO }));
    console.log('post room');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="create room title" onClose={handleClose}>
          部屋をつくる
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText>新しい部屋のアイコンと名前を設定しましょう。設定は後から変更できます。</DialogContentText>
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                autoFocus
                margin="dense"
                id="name"
                label="部屋の名前"
                fullWidth
                variant="standard"
              />
            )}
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            新規作成
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
