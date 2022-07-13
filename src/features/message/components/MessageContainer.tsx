import { Box } from "@mui/material";
import { Loading } from "../../../components/Loading";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoomLoading } from "../../room/roomSlice";
import { MessageBoard } from "./MessageBoard";
import { MessageInputForm } from "./MessageInputForm";

export const MessageContainer = () => {
  const loading = useAppSelector(selectCurrentRoomLoading);

  return (
    <>
      {loading === "pending" ? (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <Loading />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ flexGrow: 1, pt: 1, px: 1, pb: 10 }}>
            <MessageBoard />
          </Box>
          <Box sx={{ position: "fixed", bottom: 0, width: "calc(100% - 82px)", px: 1, pb: 3, bgcolor: 'background.default' }}>
            <MessageInputForm />
          </Box>
        </Box>
      )}
    </>
  );
};
