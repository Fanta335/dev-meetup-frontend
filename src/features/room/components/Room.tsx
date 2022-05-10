import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { changeLocation } from "../roomSlice";
import { RoomContent } from "./RoomContent";

export const Room = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  dispatch(changeLocation("room"));

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "lightgreen", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <RoomContent roomId={id} />
        </Box>
      </Box>
    </>
  );
};
