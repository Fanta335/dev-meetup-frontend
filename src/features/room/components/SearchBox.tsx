import { InputAdornment, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { VFC } from "react";

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

export const SearchBox: VFC<Props> = ({ defaultValue = "" }) => {
  const { handleSubmit, control } = useForm<FormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async (content) => {
    navigate({
      pathname: "/app/room-discovery/search",
      search: createSearchParams([["query", content.roomName], ...Object.entries(defaultSearchParams)]).toString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        defaultValue={defaultValue}
        rules={{ required: true }}
      />
    </form>
  );
};
