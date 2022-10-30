import { Button, Dialog, DialogActions, DialogContent, InputAdornment, TextField, Typography } from "@mui/material";
import { FC, memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { selectCurrentUser, updateUserProfile } from "../userSlice";
import { BootstrapDialogTitle } from "../../../components/Elements/Dialog/BootstrapDialogTitle";

type EditUserDescriptionDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  description: string;
};

export const EditUserDescriptionDialog: FC<EditUserDescriptionDialogProps> = memo(({ open, handleCloseDialog }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { handleSubmit, control, reset } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async ({ description }) => {
    const token = await getAccessTokenSilently();
    await dispatch(updateUserProfile({ token, updateUserDTO: { description } }));
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="edit user description" onClose={handleCloseDialog}>
          自己紹介を変更
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary">
            新しい自己紹介を入力してください。
          </Typography>
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                margin="dense"
                id="description"
                label="自己紹介"
                fullWidth
                variant="outlined"
                autoComplete="off"
                multiline
                inputProps={{ maxLength: 150 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "text.primary" }}>
                      {field.value.length} / 150
                    </InputAdornment>
                  ),
                }}
              />
            )}
            name="description"
            control={control}
            defaultValue={currentUser.description === "" ? "" : currentUser.description}
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
