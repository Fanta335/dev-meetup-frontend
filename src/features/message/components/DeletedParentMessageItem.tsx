import { Avatar, Box, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

export const DeletedParentMessageItem = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Avatar sx={{ width: 24, height: 24 }}>
          <ReplyIcon sx={{ width: 20, height: 20 }} />
        </Avatar>
      </Box>
      <Box sx={{ pl: 1 }}>
        <Typography variant="caption" sx={{ fontStyle: "italic" }}>
          元のメッセージは削除されました。
        </Typography>
      </Box>
    </Box>
  );
};
