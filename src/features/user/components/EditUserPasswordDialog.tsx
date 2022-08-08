import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { FC, useState, VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { updateRootUserProfile } from "../userSlice";
import { isValidPassword } from "../utils/isValidPassword";

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

type EditUserPasswordDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  password: string;
  passwordCheck: string;
};

export const EditUserPasswordDialog: VFC<EditUserPasswordDialogProps> = ({ open, handleCloseDialog }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const [isValid, setValidation] = useState(true);
  const [matched, setMatched] = useState(true);

  const onSubmit: SubmitHandler<FormInput> = async ({ password, passwordCheck }) => {
    if (!isValidPassword(password)) {
      setValidation(false);
      return;
    }

    if (password !== passwordCheck) {
      setMatched(false);
      return;
    }

    const token = await getAccessTokenSilently();
    await dispatch(updateRootUserProfile({ token, updateRootUserDTO: { password } }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="edit user password" onClose={handleCloseDialog}>
          パスワードを変更
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            新しいパスワードを入力してください。
          </Typography>
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                margin="dense"
                id="password"
                label="新しいパスワード"
                fullWidth
                variant="outlined"
                autoComplete="off"
                type="password"
                error={!isValid}
                helperText={isValid ? "" : "アルファベットの大文字と小文字、および数字"}
              />
            )}
            name="password"
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
                id="passwordCheck"
                label="新しいパスワードを確認"
                fullWidth
                variant="outlined"
                autoComplete="off"
                type="password"
                error={!matched}
                helperText={matched ? "" : "パスワードが一致しません！"}
              />
            )}
            name="passwordCheck"
            control={control}
            defaultValue=""
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
