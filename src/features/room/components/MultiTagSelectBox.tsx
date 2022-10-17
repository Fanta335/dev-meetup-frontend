import { useAuth0 } from "@auth0/auth0-react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAllTags, selectAllTags, setSearchTagIds } from "../../tag/tagSlice";

export const MultiTagSelectBox = () => {
  const allTags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchInitialAllTags = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchAllTags({ token }));
    };
    fetchInitialAllTags();
  }, [dispatch, getAccessTokenSilently]);

  const handleChange = (event: React.SyntheticEvent, values: number[]) => {
    dispatch(setSearchTagIds(values));
  };

  return (
    <>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={allTags.allIds}
        getOptionLabel={(option) => allTags.byIds[option].name}
        fullWidth
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="タグで絞り込む" placeholder="" />}
      />
    </>
  );
};
