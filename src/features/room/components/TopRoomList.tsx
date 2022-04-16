import { Box, Container, Typography } from "@mui/material";
import { RoomCard } from "./RoomCard";

export const TopRoomList = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", my: 3, mx: 4 }}>
        <Container>
          <Typography variant="h6" sx={{ color: "white", ml: 1 }}>
            注目の部屋
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
          </Box>
        </Container>
      </Box>
    </>
  );
};
