import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { messageActions, selectMessageEdit } from "../messageSlice";
import { VFC } from "react";

type Props = {
  messageId: string;
};

export const EditMessageButton: VFC<Props> = ({ messageId }) => {
  const dispatch = useAppDispatch();
  const messageEdit = useAppSelector(selectMessageEdit);
  const handleClick = () => {
    dispatch(messageActions.startEdit({ messageId }));
    console.log("start edit the message id: ", messageId);
    console.log("message edit: ", messageEdit);
  };
  return (
    <Tooltip title="編集する" placement="top" arrow>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};
