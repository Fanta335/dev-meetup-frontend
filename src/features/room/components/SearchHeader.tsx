import { Box, Card, CardContent, Typography } from "@mui/material";
import { SearchBox } from "./SearchBox";

export const SearchHeader = () => {
  return (
    <>
      <Card sx={{ display: "flex", justifyContent: "center", height: "200px", width: "80%", my: 3 }}>
        <CardContent sx={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6">Dev Meetupで部屋を探す</Typography>
          <Typography variant="subtitle1">一緒に開発する仲間を見つけよう</Typography>
          <Box sx={{ width: "100%" }}>
            <SearchBox />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
