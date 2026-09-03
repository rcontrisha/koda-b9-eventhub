import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import mockCommunities from "../../data/communities.json";

const initialState = {
  communities: mockCommunities || [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getCommunities = createAsyncThunk(
  "get_communities",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch Communities data",
      );
    }
  },
);

const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(getCommunities, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.communities = payload));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });
  },
});

export default communitiesSlice.reducer