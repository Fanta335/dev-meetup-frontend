import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import { FC, memo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { selectCurrentUser, updateRootUserProfile } from "../userSlice";
import { isValidEmail } from "../utils/isValidEmail";
import { BootstrapDialogTitle } from "../../../components/Elements/Dialog/BootstrapDialogTitle";

type EditUserEmailDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  email: string;
};

export const EditUserEmailDialog: FC<EditUserEmailDialogProps> = memo(({ open, handleCloseDialog }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const [isValid, setValidation] = useState(true);

  const onSubmit: SubmitHandler<FormInput> = async ({ email }) => {
    if (!isValidEmail(email)) {
      setValidation(false);
      return;
    }

    setValidation(true);
    const token = await getAccessTokenSilently();
    await dispatch(updateRootUserProfile({ token, updateRootUserDTO: { email } }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="edit user email" onClose={handleCloseDialog}>
          メールアドレスを変更
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary">
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
                error={!isValid}
                helperText={isValid ? "" : "メールアドレスを入力してください！"}
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
});
