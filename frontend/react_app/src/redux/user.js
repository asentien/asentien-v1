import { createSlice } from "@reduxjs/toolkit";

import baseServicesHandler from "../services/baseServicesHandler";
import { baseService } from "../services/userServices";

import { setProfileData } from "./profile";
import { setErrors, setLoading, setToast, unsetLoading } from "./ui";

const NAMESPACE = "user";

export const key = {
  createUser: "createUser",
  updateAvatar: "updateAvatar",
  updateProfile: "updateProfile",
  follow: (userId) => `follow_${userId}`,
  asentientPromotion: (username) => `asentientPromotion_${username}`,
  acceleratorPromotion: (username) => `acceleratorPromotion_${username}`,
  login: "login",
  logout: "logout",
};

const initialState = { user: false };

const userSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setFollow: (state, { payload }) => {
      state.user.following.push(payload);
    },
    setProfile: (state, { payload }) => {
      state.user.profile = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    unsetFollow: (state, { payload }) => {
      state.user.following = state.user.following.filter((k) => k !== payload);
    },
  },
});

const { actions, reducer } = userSlice;
export const { setFollow, setProfile, setUser, unsetFollow } = actions;
export default reducer;

export const logout = () => ({ type: `${NAMESPACE}/logout` });

export const selectFollowing = (state, username) =>
  state?.user?.user?.following?.includes(username);

export const selectUser = (state) => state?.user?.user;

export const createUser = (payload) => async (dispatch) => {
  const thisKey = key.createUser;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.createUser(payload));
    dispatch(setUser(data));
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    window.location.reload();
  } catch (error) {
    if (error.response) {
      dispatch(setErrors(NAMESPACE, thisKey, error.response.data));
    }
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getCurrentUser = (payload) => async (dispatch) => {
  const thisKey = key.getCurrentUser;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.getCurrentUser(payload));
    dispatch(setUser(data));
  } catch (error) {
    if (error.response) {
      dispatch(setErrors(NAMESPACE, thisKey, error.response.data));
      window.location.reload();
    }
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createAccessToken = (refresh) => async (dispatch) => {
  const thisKey = key.refreshToken;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.createAccessToken({
        refresh,
      })
    );
    localStorage.setItem("access", data.access);
  } catch (error) {
    dispatch(logoutUser());
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const changePassword = (payload) => async (dispatch) => {
  const thisKey = key.changePassword;
  const formData = {
    change_password: payload.changePassword,
    change_to_password: payload.changeToPassword,
  };
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.changePassword(formData));
    dispatch(setToast("Password Updated"));
  } catch (error) {
    if (error.response) {
      dispatch(setErrors(NAMESPACE, thisKey, error.response.data));
      dispatch(setToast("Failed to Update"));
    }
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const updateProfile = (payload, username) => async (dispatch) => {
  const thisKey = key.updateProfile;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.updateProfile(payload));
    dispatch(setProfile(data));
    dispatch(setProfileData({ data, username }));
    dispatch(setToast("Profile Updated"));
  } catch (error) {
    dispatch(setToast("Failed to Update", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const updateProfileAvatar = (payload, username) => async (dispatch) => {
  const thisKey = key.updateProfile;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.updateProfileAvatar(payload)
    );
    dispatch(setProfile(data));
    dispatch(setProfileData({ data, username }));
    dispatch(setToast("Profile Updated"));
  } catch (error) {
    dispatch(setToast("Failed to Update", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const updateProfileCover = (payload, username) => async (dispatch) => {
  const thisKey = key.updateProfile;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.updateProfileCover(payload)
    );
    dispatch(setProfile(data));
    dispatch(setProfileData({ data, username }));
    dispatch(setToast("Profile updated"));
  } catch (error) {
    dispatch(setToast("Failed to Update", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const follow = (username, userId) => async (dispatch) => {
  const thisKey = key.follow(username);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.createFollow(username));
    dispatch(setFollow(username));
    dispatch(setToast("Followed"));
  } catch (error) {
    dispatch(setToast("Failed to Follow", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const asentientPromotion = (username) => async (dispatch) => {
  const thisKey = key.asentientPromotion(username);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.createAsentientPromotion(username));
    dispatch(setToast("Asentient Promoted", "secondary"));
  } catch (error) {
    dispatch(setToast("Failed to Promote", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const acceleratorPromotion = (username) => async (dispatch) => {
  const thisKey = key.acceleratorPromotion(username);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.createAcceleratorPromotion(username));
    dispatch(setToast("Accelerator Promoted", "tertiary"));
  } catch (error) {
    dispatch(setToast("Failed to Promote", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const loginUser = (payload) => async (dispatch) => {
  const thisKey = key.login;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.loginUser(payload));
    dispatch(setUser(data));
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    window.location.reload();
  } catch (error) {
    if (error.response) {
      dispatch(setErrors(NAMESPACE, thisKey, error.response.data));
    }
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const logoutUser = () => async (dispatch) => {
  const thisKey = key.logout;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    dispatch(logout());
    window.location.reload();
  } catch (error) {
    dispatch(setToast("Failed to Logout", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const unfollow = (username, userId) => async (dispatch) => {
  const thisKey = key.follow(userId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removeFollow(username));
    dispatch(unsetFollow(userId));
    dispatch(setToast("Unfollowed"));
  } catch (error) {
    dispatch(setToast("Failed to Unfollow", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const deactivate = (username, userId) => async (dispatch) => {
  const thisKey = key.follow(userId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.deactivateUser(username));
    dispatch(setToast("Deactivated"));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
