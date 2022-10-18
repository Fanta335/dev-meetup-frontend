import { Grid, InputAdornment, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentSearchTagIds } from "../../tag/tagSlice";

type FormInput = {
  roomName: string;
};

const defaultSearchParams = {
  offset: "0",
  limit: "6",
  sort: "date",
  order: "a",
};

type Props = {
  defaultValue?: string;
};

export const SearchBox: FC<Props> = ({ defaultValue = "" }) => {
  const currentSearchTagIds = useAppSelector(selectCurrentSearchTagIds);
  const { handleSubmit, control } = useForm<FormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    const initialSearchParams = [["query", content.roomName], ...Object.entries(defaultSearchParams)];
    if (currentSearchTagIds.length === 0) {
      initialSearchParams.push(["tagId", ""]);
    } else {
      for (const tagId of currentSearchTagIds) {
        initialSearchParams.push(["tagId", tagId.toString()]);
      }
    }
    navigate({
      pathname: "/app/search",
      search: new URLSearchParams(initialSearchParams).toString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
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
                sx={{ bgcolor: "#adadad25", borderRadius: "5px" }}
              />
            )}
            name="roomName"
            control={control}
            defaultValue={defaultValue}
            rules={{ required: true }}
          />
        </Grid>
      </Grid>
    </form>
  );
};
