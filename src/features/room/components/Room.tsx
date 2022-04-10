import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { RoomContent } from "./RoomContent";
import { RoomHeader } from "./RoomHeader";

export const Room = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "lightgreen", height: "100%" }}>
        <Box>
          <RoomHeader />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <RoomContent roomId={id} />
        </Box>
      </Box>
    </>
  );
};
