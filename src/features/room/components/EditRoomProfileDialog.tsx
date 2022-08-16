import { FC, useEffect, useState, VFC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, Switch, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { postRoomAvatar, selectCurrentRoom, updateRoom } from "../roomSlice";
import { TagSelectArray } from "./TagSelectArray";

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

export type UpdateRoomFormInput = {
  name: string;
  description: string;
  isPrivate: boolean;
  avatar: FileList;
  tagIds: {
    id: string;
  }[];
};

export const EditRoomProfileDialog: VFC<EditRoomProfileDialogProps> = ({ open, handleCloseDialog, handleEdit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentTagIds = currentRoom.entity.tags.map((tag) => ({ id: tag.id.toString() }));
  console.log(currentTagIds);
  const { handleSubmit, control, reset, register } = useForm<UpdateRoomFormInput>({
    defaultValues: {
      isPrivate: currentRoom.entity.isPrivate,
      tagIds: [{ id: "" }],
    },
  });
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

  const onSubmit: SubmitHandler<UpdateRoomFormInput> = async ({ name, description, isPrivate, tagIds }) => {
    const formData = new FormData();
    const token = await getAccessTokenSilently();
    if (selectedFile !== undefined) {
      formData.append("file", selectedFile);
      await dispatch(postRoomAvatar({ token, roomId: currentRoom.entity.id, formData }));
    }
    await dispatch(updateRoom({ token, roomId: currentRoom.entity.id, updateRoomDTO: { name, description, isPrivate, tagIds } }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog fullScreen open={open} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
          <BootstrapDialogTitle id="edit room profile" onClose={handleCloseDialog}>
            <div>
              <Typography variant="h5" fontWeight="bold">
                部屋の設定
              </Typography>
            </div>
          </BootstrapDialogTitle>
          <DialogContent>
            <Button variant="contained" component="label" color="success">
              画像をアップロード
              <input hidden type="file" accept=".jpg,.jpeg,.png,.svg" {...register("avatar")} onChange={onSelectFile} />
            </Button>
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
              defaultValue={currentRoom.entity.name}
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
              defaultValue={currentRoom.entity.description}
              rules={{ required: true }}
            />
            <FormControlLabel
              control={
                <Controller
                  name="isPrivate"
                  control={control}
                  render={({ field }) => (
                    <Switch onChange={(e) => field.onChange(e.target.checked)} color="success" checked={field.value} value={field.value} />
                  )}
                />
              }
              label="部屋を非公開にする"
            />
            <TagSelectArray control={control} register={register} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" color="success">
              変更を保存する
            </Button>
          </DialogActions>
        </Stack>
      </form>
    </Dialog>
  );
};
