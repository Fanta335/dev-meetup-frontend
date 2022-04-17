import { AppBar, Box, Toolbar } from "@mui/material";
import { MessageBoard } from "./MessageBoard";
import { MessageInputForm } from "./MessageInputForm";

export const MessageContainer = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ bgcolor: "aqua", flexGrow: 1, pt: 1, px: 1, pb: 10 }}>
          <MessageBoard />
        </Box>
        <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0, width: "100%" }}>
          <Toolbar sx={{ml: '70px', mr: '200px', pb: 3}}>
            <MessageInputForm />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
