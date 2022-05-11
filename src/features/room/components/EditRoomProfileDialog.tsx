import { FC, VFC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { selectCurrentRoom, updateRoom } from "../roomSlice";

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

type EditRoomProfileDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
  handleEdit: () => void;
};

type FormInput = {
  name: string;
  description: string;
};

export const EditRoomProfileDialog: VFC<EditRoomProfileDialogProps> = ({ open, handleCloseDialog, handleEdit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const { handleSubmit, control, reset } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const token = await getAccessTokenSilently();
    console.log("input val: ", data);
    const updateRoomDTO = {
      id: currentRoom.id,
      ...data,
    };
    await dispatch(updateRoom({ token, updateRoomDTO }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="create room title" onClose={handleCloseDialog}>
          部屋の設定
        </BootstrapDialogTitle>
        <DialogContent>
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                margin="dense"
                id="name"
                label="部屋の名前"
                fullWidth
                variant="standard"
              />
            )}
            name="name"
            control={control}
            defaultValue={currentRoom.name}
            rules={{ required: true }}
          />
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                margin="dense"
                id="description"
                label="部屋の説明"
                fullWidth
                variant="standard"
              />
            )}
            name="description"
            control={control}
            defaultValue={currentRoom.description}
            rules={{ required: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" color="success">
            変更を保存する
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
