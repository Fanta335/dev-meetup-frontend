import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { FC, VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { selectCurrentUser, updateUserProfile } from "../userSlice";

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

type EditUserEmailDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  email: string;
};

export const EditUserEmailDialog: VFC<EditUserEmailDialogProps> = ({ open, handleCloseDialog }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { handleSubmit, control, reset } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async ({ email }) => {
    const token = await getAccessTokenSilently();
    await dispatch(updateUserProfile({ token, userId: currentUser.id.toString(), updateUserDTO: { email } }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="create room title" onClose={handleCloseDialog}>
          メールアドレスを変更
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            新しいメールアドレスを入力してください。
          </Typography>
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                margin="dense"
                id="email"
                label="メールアドレス"
                fullWidth
                variant="outlined"
                autoComplete="off"
              />
            )}
            name="email"
            control={control}
            defaultValue={currentUser.email}
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
