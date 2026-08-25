import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mockEvents from '../../data/events.json'

const initialState = {
  currentStep: 1,
  events: mockEvents || [],
  event: {
    image_url: "",
    title: "",
    desc: "",
    tags: [],
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    capacity: 0,
    speakers: [],
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getEvents = createAsyncThunk(
  "get_events",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch event data.");
    }
  },
);

export const addEvent = createAsyncThunk(
  "add_event",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post event data.");
    }
  },
);

export const editEvent = createAsyncThunk(
  "edit_event",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update event data.");
    }
  },
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      state.event = {
        ...state.event,
        ...payload,
      };
    },
    nextStep: (state) => {
      state.currentStep = Math.min(3, state.currentStep + 1);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(1, state.currentStep - 1);
    },
    resetForm: (state) => {
      state.event = initialState.event;
      state.currentStep = 1;
    },
    editData: (state) => {
      state.event = state.events[0];
    },
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(getEvents, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false),
          (state.error = null));
      },
      fulfilled: (state, { payload }) => {
        ((state.events = payload),
          (state.isPending = false),
          (state.isFulfilled = true));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(addEvent, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false),
          (state.error = null));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          state.events.push(payload));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(editEvent, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false),
          (state.error = null));
      },
      fulfilled: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          state.events = state.events.map((event) => {
            if (event.title === payload.title) {
              console.log("Matched.");
              console.log(payload);
              return payload;
            }
            return event;
          }));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });
  },
});

export const { updateField, nextStep, prevStep, resetForm, editData } =
  eventSlice.actions;

export default eventSlice.reducer;
