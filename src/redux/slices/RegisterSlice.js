import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create account.");
    }
  },
);

const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(registerUser, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          state.users.push(payload));
      },
      rejected: (state, { payload }) => {
        state.isPending = false,
        state.isRejected = true,
        state.error = payload
      },
    });
  },
});

export default userSlice.reducer