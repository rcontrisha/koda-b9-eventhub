import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    total_events: 0,
    total_attendees: 0,
    avg_fill_rate: 0,
    event_views: 0,
  },
  chartData: [],
  yourEvents: [],
  upcomingEvents: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getOrganizerDashboard = createAsyncThunk(
  "organizer/getDashboard",
  async (url, {getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const response = await fetch(url, {headers: {Authorization: `Bearer ${token}`}});
      const result = await response.json();

      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Failed to fetch organizer dashboard data.");
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch dashboard data.");
    }
  }
);

const organizerSlice = createSlice({
  name: "organizer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(getOrganizerDashboard, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.stats = payload.stats || initialState.stats;
        state.chartData = payload.chart_data || [];
        state.yourEvents = payload.your_events || [];
        state.upcomingEvents = payload.upcoming_events || [];
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = payload;
      },
    });
  },
});

export default organizerSlice.reducer;