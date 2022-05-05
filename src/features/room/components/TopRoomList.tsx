import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../stores/hooks";
import { selectSearchedrooms } from "../roomSlice";
import { RoomCard } from "./RoomCard";

export const TopRoomList = () => {
  const searchedRooms = useAppSelector(selectSearchedrooms);
  console.log("searched rooms: ", searchedRooms);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", my: 3, mx: 4 }}>
        <Container>
          <Typography variant="h6" sx={{ color: "white", ml: 1 }}>
            最近作られた部屋
          </Typography>
          <Grid container>
            {searchedRooms.allIds.map((id) => {
              const room = searchedRooms.byIds[id];
              return (
                <Grid key={id} item xs={6} md={4} lg={3}>
                  <RoomCard room={room} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
