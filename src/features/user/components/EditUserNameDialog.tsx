import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { selectCurrentUser, updateRootUserProfile } from '../userSlice';
import { BootstrapDialogTitle } from '../../../components/Elements/Dialog/BootstrapDialogTitle';

type EditUserNameDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  name: string;
};

export const EditUserNameDialog: FC<EditUserNameDialogProps> = memo(
  ({ open, handleCloseDialog }: EditUserNameDialogProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const { handleSubmit, control, reset } = useForm<FormInput>();

    const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
      const token = await getAccessTokenSilently();
      await dispatch(updateRootUserProfile({ token, updateRootUserDTO: { name } }));
      reset();
      handleCloseDialog();
    };

    return (
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <BootstrapDialogTitle id="edit user name" onClose={handleCloseDialog}>
            ユーザー名を変更
          </BootstrapDialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" color="text.secondary">
              新しいユーザー名を入力してください。
            </Typography>
            <Controller
              render={({ field }) => {
                return (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    inputRef={field.ref}
                    margin="dense"
                    id="name"
                    label="ユーザー名"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                );
              }}
              name="name"
              control={control}
              defaultValue={currentUser.name}
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
  }
);

EditUserNameDialog.displayName = 'EditUserNameDialog';
