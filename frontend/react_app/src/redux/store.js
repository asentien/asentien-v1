import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./notifications";
import postSlice from "./post";
import profileSlice from "./profile";
import searchSlice from "./search";
import uiReducer from "./ui";
import userSlice from "./user";

const combinedReducers = combineReducers({
  notifications: notificationsSlice,
  post: postSlice,
  profile: profileSlice,
  search: searchSlice,
  ui: uiReducer,
  user: userSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    // eslint-disable-next-line no-param-reassign
    state = {};
    localStorage.clear();
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  immutableCheck: false,
  serializableCheck: false,
  reducer: rootReducer,
});

export default store;
