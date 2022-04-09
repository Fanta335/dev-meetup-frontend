import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { RoomContent } from "./RoomContent";

export const Room = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Box sx={{ bgcolor: "lightgreen", height: "100%" }}>
        <RoomContent roomId={id} />
      </Box>
    </>
  );
};
