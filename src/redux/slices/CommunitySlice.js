import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  communities: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getCommunities = createAsyncThunk(
  "get_communities",
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(url)
      const data = response.json()

      console.log("[Response]-Popular Communities", data);
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
          (state.communities = payload.data.communities));
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