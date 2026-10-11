import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  active: null,
  resetSent: false,
  sentTo: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[Login]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Sign In");
    }
  },
);

export const getUserInfo = createAsyncThunk(
  "user_info",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const response = await fetch("http://localhost:8080/user/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[User Info]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Get User Info");
    }
  },
);

export const myEvents = createAsyncThunk(
  "my_events",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const response = await fetch("http://localhost:8080/events/my-events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[My Events]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to Retrieve User's Events",
      );
    }
  },
);

export const savedEvents = createAsyncThunk(
  "saved_events",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const response = await fetch("http://localhost:8080/events/saved-events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[Saved Events]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to Retrieve User's Events",
      );
    }
  },
);

export const myCommunities = createAsyncThunk(
  "my_communities",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const response = await fetch("http://localhost:8080/communities/my-communities", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[My Communities]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to Retrieve User's Events",
      );
    }
  },
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[Logout]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Sign Out");
    }
  },
);

export const sendResetLink = createAsyncThunk(
  "send",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Send Reset Link.");
    }
  },
);

const activeSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateActiveUser: (state, { payload }) => {
      state.active = payload;
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
          (state.active = payload.data));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(logout, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.active = null));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(getUserInfo, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.active.user = { ...state.active.user, ...payload.data.user }));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(myEvents, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.active.user = {
            ...state.active.user,
            joined_events: payload.data.events,
          }));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(savedEvents, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.active.user = {
            ...state.active.user,
            saved_events: payload.data.events,
          }));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(myCommunities, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.active.user = {
            ...state.active.user,
            joined_communities: payload.data.communities,
          }));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(sendResetLink, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          (state.resetSent = true),
          (state.sentTo = payload));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });
  },
});

export const { updateActiveUser } = activeSlice.actions;
export default activeSlice.reducer;
