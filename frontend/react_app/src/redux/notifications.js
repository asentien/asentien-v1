import { createSlice } from "@reduxjs/toolkit";
import baseServicesHandler from "../services/baseServicesHandler";
import { baseService } from "../services/notificationsServices";

import { setLoading, setToast, unsetLoading } from "./ui";

const NAMESPACE = "notifications";

export const key = {
  notifications: "notifications",
  notificationsNext: "notificationsNext",
  unreadNotifications: "unreadNotifications",
  removeNotification: (notificationId) =>
    `removeNotification_${notificationId}`,
};

const initialState = {
  unreadCount: null,
  notifications: {
    results: [],
  },
};

const notificationsSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setNotifications: (state, { payload }) => {
      state.notifications.next = payload.next;
      state.notifications.results = [
        ...state.notifications.results,
        ...payload.results,
      ];
    },
    setUnreadNotificationsCount: (state, { payload }) => {
      state.unreadCount = payload;
    },
    unsetNotification: (state, { payload }) => {
      state.notifications.results = state.notifications.results.filter(
        (obj) => obj.id !== payload
      );
    },
  },
});

const { actions, reducer } = notificationsSlice;
export const {
  setNotifications,
  setUnreadNotificationsCount,
  unsetNotification,
} = actions;
export default reducer;

export const selectNotifications = (state) => state.notifications.notifications;

export const selectUnreadNotificationsCount = (state) => {
  const { unreadCount } = state.notifications;
  return unreadCount === null ? 0 : unreadCount;
};

export const selectNotReadNotificationsCount = (state) => {
  const { unreadCount } = state.notifications;
  return unreadCount === null ? 0 : unreadCount;
};

export const getNotifications =
  (nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.notifications;
    if (nextUrl) {
      thisKey = key.notificationsNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getNotifications,
        nextUrl
      );
      dispatch(setNotifications(data));
      dispatch(setUnreadNotificationsCount(0));
    } catch (error) {
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getUnreadNotificationsCount = () => async (dispatch) => {
  const thisKey = key.unreadNotifications;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.getUnreadNotificationsCount
    );
    dispatch(setUnreadNotificationsCount(data));
  } catch (error) {
    window.location.reload();
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeNotification = (notificationId) => async (dispatch) => {
  const thisKey = key.removeNotification(notificationId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removeNotification(notificationId));
    dispatch(unsetNotification(notificationId));
    dispatch(setToast("Notification Deactivated", "secondary"));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
