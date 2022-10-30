import { Avatar, Button, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { selectCurrentUser, updateUserAvatar } from '../userSlice';
import { BootstrapDialogTitle } from '../../../components/Elements/Dialog/BootstrapDialogTitle';

type EditUserAvatarDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  avatar: FileList;
};

export const EditUserAvatarDialog: FC<EditUserAvatarDialogProps> = memo(
  ({ open, handleCloseDialog }: EditUserAvatarDialogProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const { handleSubmit, reset, register } = useForm<FormInput>();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string>();

    useEffect(() => {
      if (!selectedFile) {
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => {
        return URL.revokeObjectURL(objectUrl);
      };
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
        formData.append('file', selectedFile);
      }

      console.log('form data: ', formData.values());

      const token = await getAccessTokenSilently();
      await dispatch(updateUserAvatar({ token, formData }));
      reset();
      handleCloseDialog();
    };

    return (
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <BootstrapDialogTitle id="edit usre avatar" onClose={handleCloseDialog}>
            プロフィール画像の設定
          </BootstrapDialogTitle>
          <DialogContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Avatar sx={{ width: 120, height: 120 }} src={preview || currentUser.avatar.url} />
              <Grid item>
                <Button variant="contained" component="label" color="success">
                  画像をアップロード
                  <input
                    hidden
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg"
                    {...register('avatar')}
                    onChange={onSelectFile}
                  />
                </Button>
              </Grid>
            </Grid>
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

EditUserAvatarDialog.displayName = 'EditUserAvatarDialog';
