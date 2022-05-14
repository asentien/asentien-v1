import { createSlice } from "@reduxjs/toolkit";

import baseServicesHandler from "../services/baseServicesHandler";
import { baseService } from "../services/profileServices";

import { setLoading, setToast, unsetLoading } from "./ui";

const NAMESPACE = "profile";

export const key = {
  following: (username) => `following_${username}`,
  followingNext: (username) => `followingNext_${username}`,
  followers: (username) => `followers_${username}`,
  followersNext: (username) => `followersNext_${username}`,
  profileUser: (username) => `profileUser_${username}`,
};

const initialState = {};

const profileSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setFollowers: (state, { payload }) => {
      const { data, username } = payload;
      if (!state[username]) {
        state[username] = {};
      }
      if (!state[username].followers) {
        state[username].followers = { results: [] };
      }
      state[username].followers.next = data.next;
      state[username].followers.results.push(...data.results);
    },
    setFollowing: (state, { payload }) => {
      const { data, username } = payload;
      if (!state[username]) {
        state[username] = {};
      }
      if (!state[username].following) {
        state[username].following = { results: [] };
      }
      state[username].following.next = data.next;
      state[username].following.results.push(...data.results);
    },
    setProfileData: (state, { payload }) => {
      const { data, username } = payload;
      if (state[username]) {
        state[username].user.profile = {
          ...state[username].user.profile,
          ...data,
        };
      }
    },
    setProfileUser: (state, { payload }) => {
      const { username } = payload;
      state[username] = { ...state[username], user: payload };
    },
  },
});

const { actions, reducer } = profileSlice;
export const { setFollowers, setFollowing, setProfileData, setProfileUser } =
  actions;
export default reducer;

export const selectFollowers = (state, username) => {
  const user = state.profile[username];
  if (user === undefined || user.followers === undefined) {
    return { count: 0, results: [] };
  }
  return user.followers;
};

export const selectFollowing = (state, username) => {
  const user = state.profile[username];
  if (user === undefined || user.following === undefined) {
    return { count: 0, results: [] };
  }
  return user.following;
};

export const selectProfileUser = (state, username) => {
  const user = state.profile[username];
  if (user === undefined || user.user === undefined) {
    return {};
  }
  return user.user;
};

export const getFollowers =
  (username, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.followers(username);
    if (nextUrl) {
      thisKey = key.followersNext(username);
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getFollowers(username),
        nextUrl
      );
      dispatch(setFollowers({ data, username }));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getFollowing =
  (username, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.following(username);
    if (nextUrl) {
      thisKey = key.followingNext(username);
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getFollowing(username),
        nextUrl
      );
      dispatch(setFollowing({ data, username }));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getUser = (username) => async (dispatch) => {
  const thisKey = key.profileUser(username);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.getUser(username));
    dispatch(setProfileUser(data));
  } catch (error) {
    dispatch(setToast("Failed to Load", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
