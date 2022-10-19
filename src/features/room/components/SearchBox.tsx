import { Autocomplete, Grid, InputAdornment, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAllTags, selectAllTags } from "../../tag/tagSlice";
import { useAuth0 } from "@auth0/auth0-react";

type FormInput = {
  roomName: string;
  tagIds: number[];
};

const defaultSearchParams = {
  offset: "0",
  limit: "6",
  sort: "date",
  order: "a",
};

type Props = {
  defaultRoomName?: string;
  defaultTagIds?: number[];
};

export const SearchBox: FC<Props> = ({ defaultRoomName = "", defaultTagIds = [] }) => {
  const { handleSubmit, control } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      roomName: defaultRoomName,
      tagIds: defaultTagIds,
    },
  });
  const navigate = useNavigate();
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

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    const initialSearchParams = [["query", content.roomName], ...Object.entries(defaultSearchParams)];
    if (content.tagIds.length === 0) {
      initialSearchParams.push(["tagId", ""]);
    } else {
      for (const tagId of content.tagIds) {
        initialSearchParams.push(["tagId", tagId.toString()]);
      }
    }
    navigate({
      pathname: "/app/search",
      search: new URLSearchParams(initialSearchParams).toString(),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Controller
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  id="search"
                  type="search"
                  placeholder="部屋を探す"
                  fullWidth
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              name="roomName"
              control={control}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="tagIds"
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={allTags.allIds}
                  getOptionLabel={(option) => allTags.byIds[option].name}
                  fullWidth
                  filterSelectedOptions
                  onChange={(event, value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                  ref={field.ref}
                  id="tagIds"
                  renderInput={(params) => <TextField {...params} label="タグで絞り込む" />}
                />
              )}
            />
          </Grid>
          <input type="submit" hidden />
        </Grid>
      </form>
    </>
  );
};
