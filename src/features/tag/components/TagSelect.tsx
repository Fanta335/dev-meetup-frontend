import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectAllTags, selectCurrentTag, setTag, fetchAllTags } from "../tagSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const TagSelect = () => {
  const allTags = useAppSelector(selectAllTags);
  const currentTag = useAppSelector(selectCurrentTag);
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchInitialAllTags = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchAllTags({ token }));
    };
    fetchInitialAllTags();
  }, [dispatch, getAccessTokenSilently]);

  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    if (val) {
      dispatch(setTag(allTags.byIds[val]));
    } else {
      dispatch(setTag(null));
    }
  };

  return (
    <>
      <FormControl sx={{ mt: 3, minWidth: 220, pb: 3, width: "100%" }}>
        <InputLabel id="tag-select-label">タグで絞り込む</InputLabel>
        <Select labelId="tag-select-label" id="tag-select-label-helper" value={currentTag ? currentTag.id.toString() : ""} label="tag" onChange={handleChange}>
          <MenuItem value="">
            <em>指定しない</em>
          </MenuItem>
          {allTags.allIds.map((id) => (
            <MenuItem value={id} key={id}>
              {allTags.byIds[id].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
