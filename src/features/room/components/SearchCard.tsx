import { Card, CardContent, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchCard = () => {
  return (
    <>
      <Card sx={{ display: "flex", justifyContent: "center", height: "200px", width: "80%", my: 3 }}>
        <CardContent sx={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6">Dev Meetupで部屋を探す</Typography>
          <Typography variant="subtitle1">一緒に開発する仲間を見つけよう</Typography>
          <TextField
            id="outlined-search"
            type="search"
            placeholder="部屋を探す"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};
