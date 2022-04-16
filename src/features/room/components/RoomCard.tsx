import { Card, CardContent, Typography } from "@mui/material";

export const RoomCard = () => {
  return (
    <Card sx={{ width: "23%", height: "200px", m:1 }}>
      <CardContent>
        <Typography>Room card.</Typography>
      </CardContent>
    </Card>
  );
};
