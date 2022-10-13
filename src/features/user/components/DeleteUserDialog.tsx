import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { FC, useState, VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { deleteUser, selectCurrentUser } from "../userSlice";
import { useNavigate } from "react-router-dom";

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

type DeleteUserDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
};

type FormInput = {
  deletionConfirmMessage: string;
};

export const DeleteUserDialog: VFC<DeleteUserDialogProps> = ({ open, handleCloseDialog }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { handleSubmit, control, reset } = useForm<FormInput>();
  const [matched, setMatched] = useState(true);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async ({ deletionConfirmMessage }) => {
    if (deletionConfirmMessage !== currentUser.name + "を削除する") {
      setMatched(false);
      return;
    }

    const token = await getAccessTokenSilently();
    await dispatch(deleteUser({ token, userId: currentUser.id.toString() }));
    reset();
    handleCloseDialog();
    navigate("/");
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle id="delete user" onClose={handleCloseDialog}>
          アカウントを削除
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary">
            アカウントを削除するには、「{currentUser.name}を削除する」と入力してください。
          </Typography>
          <Controller
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                margin="dense"
                id="deletionConfirmMessage"
                fullWidth
                variant="outlined"
                autoComplete="off"
                error={!matched}
                helperText={matched ? "" : "入力が一致しません！"}
              />
            )}
            name="deletionConfirmMessage"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" color="error">
            アカウントを削除する
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
