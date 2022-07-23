import { useAuth0 } from "@auth0/auth0-react";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { searchAsyncRooms, selectSearchedrooms } from "../roomSlice";
import { SearchBox } from "./SearchBox";
import { SearchedRoomList } from "./SearchedRoomList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export const SearchRoomResult = () => {
  const [searchParams] = useSearchParams();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const searchedRooms = useAppSelector(selectSearchedrooms);

  useEffect(() => {
    const searchRooms = async () => {
      const token = await getAccessTokenSilently();

      await dispatch(searchAsyncRooms({ token: token, searchParams: searchParams.toString() }));
    };

    searchRooms();
  }, [dispatch, getAccessTokenSilently, searchParams]);

  const queryInput = searchParams.get("query");
  const defaultValue = !queryInput ? "" : queryInput;

  return (
    <>
      <Box sx={{ maxWidth: "800px", px: 3, pt: 10 }}>
        <Box sx={{ display: "flex" }}>
          <IconButton component={Link} to="/app/">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">
            {searchedRooms.allIds.length === 0 ? `「${queryInput}」の部屋は見つかりませんでした。` : `「${queryInput}」の部屋が${searchedRooms.allIds.length} 件あります`}
          </Typography>
        </Box>
        <SearchBox defaultValue={defaultValue} />
        <SearchedRoomList />
      </Box>
    </>
  );
};
