import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { postRoom, roomActions, selectRoomAvatarPreviewUrl } from "../roomSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
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

export type CreateRoomDialogProps = {
  open: boolean;
  handleClose: () => void;
  selectedFile: File | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

export type CreateRoomFormInput = {
  name: string;
  description: string;
  isPrivate: boolean;
  avatar: FileList;
  tagIds: {
    id: string;
  }[];
};

export const CreateRoomDialog: VFC<CreateRoomDialogProps> = ({ open, handleClose, selectedFile, setSelectedFile }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, register } = useForm<CreateRoomFormInput>({
    defaultValues: {
      isPrivate: false,
      tagIds: [{ id: "" }],
    },
  });
  const preview = useAppSelector(selectRoomAvatarPreviewUrl);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    dispatch(roomActions.setRoomAvatarPreview({ url: objectUrl }));

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, dispatch]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<CreateRoomFormInput> = async ({ name, description, isPrivate, tagIds }) => {
    // define data type so that it can be refered as data[key].
    const data: { [key: string]: string | boolean | { id: string }[] } = { name, description, isPrivate, tagIds };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key.toString(), JSON.stringify(data[key]));
    }
    if (selectedFile !== undefined) formData.append("file", selectedFile);

    const token = await getAccessTokenSilently();

    await dispatch(postRoom({ token, formData }))
      .unwrap()
      .then((data) => navigate(`/app/rooms/${data.id}`));

    reset();
    handleClose();
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
          <BootstrapDialogTitle id="create room title" onClose={handleClose}>
            <div>
              <Typography variant="h5" fontWeight="bold">
                部屋を作る
              </Typography>
            </div>
          </BootstrapDialogTitle>
          <DialogContent style={{ maxWidth: "600px" }}>
            <DialogContentText>新しい部屋のプロフィールを設定しましょう。設定は後から変更できます。</DialogContentText>
            <Button variant="contained" component="label" color="success">
              画像をアップロード
              <input hidden type="file" accept=".jpg,.jpeg,.png,.svg" {...register("avatar")} onChange={onSelectFile} />
            </Button>
            <Typography variant="h6">image preview</Typography>
            {preview ? <img src={preview} alt="preview" style={{ height: "100px" }} /> : <ImageIcon sx={{ height: "100px", width: "100px" }} />}
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
              defaultValue=""
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
            <TagSelectArray register={register} control={control} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} color="secondary">
              キャンセル
            </Button>
            <Button variant="contained" type="submit" color="success">
              新規作成
            </Button>
          </DialogActions>
        </Stack>
      </form>
    </Dialog>
  );
};
