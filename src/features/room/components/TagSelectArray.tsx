import React, { useEffect, VFC } from "react";

import { Box, Button, Container, Stack, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { Add as AddIcon, DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAllTags, selectAllTags } from "../../tag/tagSlice";
import { CreateRoomFormInput } from "./CreateRoomDialog";
import { useAuth0 } from "@auth0/auth0-react";
import { UpdateRoomFormInput } from "./EditRoomProfileDialog";

type Props = {
  register: UseFormRegister<CreateRoomFormInput | UpdateRoomFormInput>;
  control: Control<CreateRoomFormInput | UpdateRoomFormInput, any>;
};

export const TagSelectArray: VFC<Props> = ({ control, register }) => {
  const allTags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const { fields, append, remove } = useFieldArray({
    name: "tagIds",
    control,
  });

  useEffect(() => {
    const fetchInitialTags = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchAllTags({ token }));
    };
    fetchInitialTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              <Box display="flex" alignItems="center">
                <FormControl sx={{ minWidth: 220, width: "100%" }}>
                  <InputLabel id="tag-select-label">タグを選択</InputLabel>
                  <Select labelId="tag-select-label" label="タグを選択" defaultValue="" {...register(`tagIds.${index}.id` as const, { required: true })}>
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
                <IconButton aria-label="delete" onClick={() => remove(index)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </React.Fragment>
          );
        })}
      </Stack>
      {fields.length < 5 && (
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              id: "",
            })
          }
        >
          タグを追加する
        </Button>
      )}
    </Container>
  );
};
