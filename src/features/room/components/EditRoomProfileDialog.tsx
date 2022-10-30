import { FC, memo, useEffect, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { postRoomAvatar, selectCurrentRoom, updateRoom } from '../roomSlice';
import { fetchAllTags, selectAllTags } from '../../tag/tagSlice';
import { BootstrapDialogTitle } from '../../../components/Elements/Dialog/BootstrapDialogTitle';

type EditRoomProfileDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

export type UpdateRoomFormInput = {
  name: string;
  description: string;
  isPrivate: boolean;
  avatar: FileList;
  tagIds: number[];
};

export const EditRoomProfileDialog: FC<EditRoomProfileDialogProps> = memo(
  ({ open, handleCloseDialog }: EditRoomProfileDialogProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();
    const currentRoom = useAppSelector(selectCurrentRoom);
    const { handleSubmit, control, reset, register } = useForm<UpdateRoomFormInput>({
      mode: 'onChange',
      defaultValues: {
        isPrivate: currentRoom.entity.isPrivate,
        tagIds: currentRoom.entity.tags.map((tag) => {
          return tag.id;
        }),
      },
    });
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const allTags = useAppSelector(selectAllTags);

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

    const onSubmit: SubmitHandler<UpdateRoomFormInput> = async ({
      name,
      description,
      isPrivate,
      tagIds,
    }) => {
      const formData = new FormData();
      const token = await getAccessTokenSilently();
      if (selectedFile !== undefined) {
        formData.append('file', selectedFile);
        await dispatch(postRoomAvatar({ token, roomId: currentRoom.entity.id, formData }));
      }
      await dispatch(
        updateRoom({
          token,
          roomId: currentRoom.entity.id,
          updateRoomDTO: { name, description, isPrivate, tagIds },
        })
      );
      reset();
      handleCloseDialog();
    };

    return (
      <Dialog fullScreen open={open} onClose={handleCloseDialog}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
            <BootstrapDialogTitle id="edit room profile" onClose={handleCloseDialog}>
              <div>
                <Typography variant="h5" fontWeight="bold">
                  部屋の設定
                </Typography>
              </div>
            </BootstrapDialogTitle>
            <DialogContent sx={{ width: '100%', maxWidth: '600px' }}>
              <Stack spacing={3}>
                <Grid container item>
                  <Typography fontFamily="" variant="subtitle1">
                    部屋のアイコン
                  </Typography>
                  <Grid container alignItems="center" justifyContent="space-between" px={4}>
                    <Avatar
                      sx={{ width: 120, height: 120 }}
                      src={preview || currentRoom.entity.avatar?.url}
                    />
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
                    defaultValue={currentRoom.entity.name}
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
                    defaultValue={currentRoom.entity.description}
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
                          getOptionDisabled={(option) => {
                            return field.value.length === 5;
                          }}
                          fullWidth
                          filterSelectedOptions
                          onChange={(event, value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                          ref={field.ref}
                          id="tagIds"
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
              <Button variant="contained" onClick={handleCloseDialog} color="secondary">
                キャンセル
              </Button>
              <Button variant="contained" type="submit" color="success">
                変更を保存する
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
    );
  }
);

EditRoomProfileDialog.displayName = 'EditRoomProfileDialog';
