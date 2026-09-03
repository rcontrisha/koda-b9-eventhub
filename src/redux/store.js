import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "./slices/RegisterSlice";
import activeReducer from "./slices/LoginSlice";
import eventReducer from "./slices/EventSlice";
import communitiesReducer from "./slices/CommunitySlice"

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

const persistUserConfig = {
  key: "users",
  storage,
  whitelist: ["users"],
};

const persistActiveConfig = {
  key: "active",
  storage,
  whitelist: ["active"],
};

const persistEventConfig = {
  key: "event",
  storage,
  whitelist: ["events"],
};

const persistCommunitiesConfig = {
  key: "communities",
  storage,
  whitelist: ["communities"]
}

const store = configureStore({
  reducer: {
    userState: persistReducer(persistUserConfig, userReducer),
    activeState: persistReducer(persistActiveConfig, activeReducer),
    eventState: persistReducer(persistEventConfig, eventReducer),
    communitiesState: persistReducer(persistCommunitiesConfig, communitiesReducer)
  },
});

export const persistor = persistStore(store);

export default store;
