import { IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

export const ReplyButton = () => {
  return (
    <Tooltip title="返信する" placement="top" arrow>
      <IconButton>
        <ReplyIcon />
      </IconButton>
    </Tooltip>
  );
};
