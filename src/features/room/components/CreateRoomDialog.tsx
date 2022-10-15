import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { postRoom, roomActions, selectRoomAvatarPreviewUrl } from "../roomSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchAllTags, selectAllTags } from "../../tag/tagSlice";

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
  tagIds: number[];
};

export const CreateRoomDialog: FC<CreateRoomDialogProps> = ({ open, handleClose, selectedFile, setSelectedFile }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, register } = useForm<CreateRoomFormInput>({
    mode: "onChange",
    defaultValues: {
      isPrivate: false,
      tagIds: [],
    },
  });
  const preview = useAppSelector(selectRoomAvatarPreviewUrl);
  const allTags = useAppSelector(selectAllTags);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    dispatch(roomActions.setRoomAvatarPreview({ url: objectUrl }));

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, dispatch]);

  useEffect(() => {
    const fetchInitialAllTags = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchAllTags({ token }));
    };
    fetchInitialAllTags();
  }, [dispatch, getAccessTokenSilently]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<CreateRoomFormInput> = async ({ name, description, isPrivate, tagIds }) => {
    const data: { [key: string]: string | boolean | number[] } = { name, description, isPrivate, tagIds };
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
            <Stack spacing={3}>
              <DialogContentText fontFamily="">新しい部屋のプロフィールを設定しましょう。設定は後から変更できます。</DialogContentText>
              <Typography fontFamily="" variant="subtitle1">
                部屋のアイコン
              </Typography>
              <Grid container alignItems="center" justifyContent="space-between" px={4}>
                <Avatar sx={{ width: 120, height: 120 }} src={preview || ""} />
                <Grid item>
                  <Button variant="contained" component="label" color="success">
                    画像をアップロード
                    <input hidden type="file" accept=".jpg,.jpeg,.png,.svg" {...register("avatar")} onChange={onSelectFile} />
                  </Button>
                </Grid>
              </Grid>
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
                    variant="outlined"
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
                    variant="outlined"
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
                label={<Typography fontFamily="">部屋を非公開にする</Typography>}
              />
              <Controller
                control={control}
                name="tagIds"
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={allTags.allIds}
                    getOptionLabel={(option) => allTags.byIds[option].name}
                    fullWidth
                    filterSelectedOptions
                    onChange={(event, value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                    ref={field.ref}
                    id="tagIds"
                    renderInput={(params) => <TextField {...params} label="部屋のタグ" />}
                  />
                )}
              />
            </Stack>
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
