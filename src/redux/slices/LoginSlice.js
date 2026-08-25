import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  active: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Sign In");
    }
  },
);

const activeSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateActiveUser: (state, { payload }) => {
      state.active = payload
    },
    logout: (state) => {
      state.active = null;
    },
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(loginUser, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.active = payload));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });
  },
});

export const { logout, updateActiveUser } = activeSlice.actions;
export default activeSlice.reducer;
