import { Box } from "@mui/material";
import { MessageBoard } from "./MessageBoard";
import { MessageInputForm } from "./MessageInputForm";

export const MessageContainer = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ bgcolor: "aqua", flexGrow: 1 }}>
          <MessageBoard />
        </Box>
        <Box sx={{ bgcolor: "khaki", pb: 3, px: 2 }}>
          <MessageInputForm />
        </Box>
      </Box>
    </>
  );
};
