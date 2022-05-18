import { FC, useEffect, useState, VFC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
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
  avatar: FileList;
};

export const EditRoomProfileDialog: VFC<EditRoomProfileDialogProps> = ({ open, handleCloseDialog, handleEdit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const { handleSubmit, control, reset, register } = useForm<FormInput>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { name, description } = data;
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("name", name);
    formData.append("description", description);

    console.log("form data: ", formData.values());

    const token = await getAccessTokenSilently();
    await dispatch(updateRoom({ token, roomId: currentRoom.id, formData }));
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
          <input type="file" {...register("avatar")} onChange={onSelectFile} />
          <Typography variant="h6">image preview</Typography>
          {preview ? <img src={preview} alt="preview" style={{ height: "100px" }} /> : <p>no image</p>}
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
