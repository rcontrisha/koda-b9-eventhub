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
      console.log(payload);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          "name": payload.fullName,
          "email": payload.email,
          "password": payload.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.json();
      console.log("[Register]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create account.");
    }
  },
);

const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      const idx = state.users.findIndex((user) => user.email === payload.email);
      console.log(idx);
      if (idx === -1) return null;
      state.users[idx] = { ...state.users[idx], ...payload };
    },
  },
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
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
