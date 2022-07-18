import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { FC, useEffect, useState, VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { selectCurrentUser, updateUserAvatar } from "../userSlice";

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

type EditUserAvatarDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  avatar: FileList;
};

export const EditUserAvatarDialog: VFC<EditUserAvatarDialogProps> = ({ open, handleCloseDialog }) => {
  const {getAccessTokenSilently} = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { handleSubmit, reset, register } = useForm<FormInput>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(()=> {
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

  const onSubmit: SubmitHandler<FormInput> = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    console.log("form data: ", formData.values());

    const token = await getAccessTokenSilently();
    await dispatch(updateUserAvatar({ token, userId: currentUser.id.toString(), formData }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="create room title" onClose={handleCloseDialog}>
          プロフィール画像の設定
        </BootstrapDialogTitle>
        <DialogContent>
          <input type="file" {...register("avatar")} onChange={onSelectFile} />
          <Typography variant="h6">image preview</Typography>
          {preview ? <img src={preview} alt="preview" style={{ height: "100px" }} /> : <p>no image</p>}
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
