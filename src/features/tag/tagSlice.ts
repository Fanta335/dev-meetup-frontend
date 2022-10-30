import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../stores/store';
import { normalizeTags } from './libs/normalizr/normalizeTags';
import { Tag, TagType } from './types';

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: TagType = {
  allTags: {
    byIds: {},
    allIds: [],
  },
};

export const fetchAllTags = createAsyncThunk<Tag[], { token: string }>(
  'tag/fetchAllTags',
  async ({ token }) => {
    const res = await axios.get<Tag[]>(`${apiUrl}/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTags.fulfilled, (state, action: PayloadAction<Tag[]>) => {
      const normalizedTagsData = normalizeTags(action.payload);
      if (normalizedTagsData.entities.allTags !== undefined) {
        state.allTags.byIds = normalizedTagsData.entities.allTags;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        state.allTags.allIds = normalizedTagsData.result.allTags;
      }
    });
  },
});

export const selectAllTags = (state: RootState) => {
  return state.tag.allTags;
};

export const tagReducer = tagSlice.reducer;
