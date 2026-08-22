import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import eventReducer from "./slices/EventForm";

const storage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem: (key) => {
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

const persistEventConfig = {
  key: "event",
  storage,
  whitelist: ["event"],
};

const store = configureStore({
  reducer: {
    eventState: persistReducer(persistEventConfig, eventReducer),
  },
});

export const persistor = persistStore(store);

export default store;
