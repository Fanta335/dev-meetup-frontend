import React from "react";

import { Box, Button, Container, Stack, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { useForm, useFieldArray } from "react-hook-form";
import { Add as AddIcon, DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import { useAppSelector } from "../../../stores/hooks";
import { selectAllTags } from "../../tag/tagSlice";

export type FormValues = {
  tags: {
    tagId: string;
  }[];
};

export const TagSelectArray = () => {
  const allTags = useAppSelector(selectAllTags);

  const {
    register,
    control,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      tags: [{ tagId: "" }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              <Box display="flex" alignItems="center">
                <FormControl sx={{ minWidth: 220, width: "100%" }}>
                  <InputLabel id="tag-select-label">タグを選択</InputLabel>
                  <Select labelId="tag-select-label" label="タグを選択" defaultValue="" {...register(`tags.${index}.tagId` as const, { required: true })}>
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
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              tagId: "",
            })
          }
        >
          タグを追加する
        </Button>
      )}
      <Box textAlign="center" mt={2}>
        <Button color="primary" variant="contained" disableElevation onClick={handleSubmit(onSubmit)}>
          送信
        </Button>
      </Box>
    </Container>
  );
};
