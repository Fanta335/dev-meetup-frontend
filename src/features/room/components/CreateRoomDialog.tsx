import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { postRoom, roomActions, selectRoomAvatarPreviewUrl } from '../roomSlice';
import { fetchAllTags, selectAllTags } from '../../tag/tagSlice';
import { BootstrapDialogTitle } from '../../../components/Elements/Dialog/BootstrapDialogTitle';

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

export const CreateRoomDialog: FC<CreateRoomDialogProps> = memo(
  ({ open, handleClose, selectedFile, setSelectedFile }: CreateRoomDialogProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleSubmit, control, reset, register } = useForm<CreateRoomFormInput>({
      mode: 'onChange',
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

      return () => {
        return URL.revokeObjectURL(objectUrl);
      };
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

    const onSubmit: SubmitHandler<CreateRoomFormInput> = async ({
      name,
      description,
      isPrivate,
      tagIds,
    }) => {
      const data: { [key: string]: string | boolean | number[] } = {
        name,
        description,
        isPrivate,
        tagIds,
      };
      const formData = new FormData();
      for (const key in data) {
        formData.append(key.toString(), JSON.stringify(data[key]));
      }
      if (selectedFile !== undefined) formData.append('file', selectedFile);

      const token = await getAccessTokenSilently();

      await dispatch(postRoom({ token, formData }))
        .unwrap()
        .then((data) => {
          return navigate(`/app/rooms/${data.id}`);
        });

      reset();
      handleClose();
    };

    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
            <BootstrapDialogTitle id="create room title" onClose={handleClose}>
              <div>
                <Typography variant="h5" fontWeight="bold">
                  部屋を作る
                </Typography>
              </div>
            </BootstrapDialogTitle>
            <DialogContent style={{ maxWidth: '600px' }}>
              <Stack spacing={3}>
                <DialogContentText fontFamily="">
                  新しい部屋のプロフィールを設定しましょう。設定は後から変更できます。
                </DialogContentText>
                <Grid container item>
                  <Typography fontFamily="" variant="subtitle1">
                    部屋のアイコン
                  </Typography>
                  <Grid container alignItems="center" justifyContent="space-between" px={4}>
                    <Avatar sx={{ width: 120, height: 120 }} src={preview || ''} />
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
                </Grid>
                <Grid container item>
                  <Typography fontFamily="" variant="subtitle1">
                    部屋の名前
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
                          fullWidth
                          variant="outlined"
                          autoComplete="off"
                        />
                      );
                    }}
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid container item>
                  <Typography fontFamily="" variant="subtitle1">
                    部屋の説明
                  </Typography>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          inputRef={field.ref}
                          margin="dense"
                          id="description"
                          fullWidth
                          variant="outlined"
                          autoComplete="off"
                        />
                      );
                    }}
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                  />
                </Grid>
                <FormControlLabel
                  control={
                    <Controller
                      name="isPrivate"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Switch
                            onChange={(e) => {
                              return field.onChange(e.target.checked);
                            }}
                            color="success"
                            checked={field.value}
                            value={field.value}
                          />
                        );
                      }}
                    />
                  }
                  label={<Typography fontFamily="">部屋を非公開にする</Typography>}
                />
                <Grid container item>
                  <Stack>
                    <Typography fontFamily="" variant="subtitle1">
                      部屋のタグ
                    </Typography>
                    <Typography fontFamily="" variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
                      最大で 5 つ設定できます。
                    </Typography>
                  </Stack>
                  <Controller
                    control={control}
                    name="tagIds"
                    render={({ field }) => {
                      return (
                        <Autocomplete
                          multiple
                          options={allTags.allIds}
                          getOptionLabel={(option) => {
                            return allTags.byIds[option].name;
                          }}
                          fullWidth
                          filterSelectedOptions
                          onChange={(event, value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                          ref={field.ref}
                          id="tagIds"
                          getOptionDisabled={(option) => {
                            return field.value.length === 5;
                          }}
                          renderInput={(params) => {
                            return <TextField {...params} />;
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
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
  }
);

CreateRoomDialog.displayName = 'CreateRoomDialog';
