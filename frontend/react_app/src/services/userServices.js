import { baseUrl, config } from "./baseServicesHandler";

export const baseService = {
  createFollow: (username) => ({
    method: "post",
    headers: config,
    url: `${baseUrl}/users/${username}/following/`,
  }),

  createAsentientPromotion: (username) => ({
    method: "post",
    headers: config,
    url: `${baseUrl}/users/${username}/asentient-promotion/`,
  }),

  createAcceleratorPromotion: (username) => ({
    method: "post",
    headers: config,
    url: `${baseUrl}/users/${username}/accelerator-promotion/`,
  }),

  createUser: (data) => ({
    data,
    method: "post",
    url: `${baseUrl}/users/signup/`,
  }),

  createAccessToken: (data) => ({
    data,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    url: `${baseUrl}/users/refresh-token/`,
  }),

  changePassword: (data) => ({
    data,
    method: "put",
    headers: config,
    url: `${baseUrl}/users/change-password/`,
  }),

  updateProfile: (data) => ({
    data,
    method: "patch",
    headers: config,
    url: `${baseUrl}/users/update-profile/`,
  }),

  updateProfileAvatar: (data) => ({
    data,
    method: "patch",
    headers: config,
    url: `${baseUrl}/users/update-profile-avatar/`,
  }),

  updateProfileCover: (data) => ({
    data,
    method: "patch",
    headers: config,
    url: `${baseUrl}/users/update-profile-cover/`,
  }),

  updateUser: (data) => ({
    data,
    method: "patch",
    headers: config,
    url: `${baseUrl}/users/update-user/`,
  }),

  getCurrentUser: (data) => ({
    data,
    method: "get",
    headers: config,
    url: `${baseUrl}/users/get-current-user/`,
  }),

  loginUser: (data) => ({
    data,
    method: "post",
    url: `${baseUrl}/users/login/`,
  }),

  removeFollow: (username) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/users/${username}/following/`,
  }),

  deactivateUser: (username) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/users/${username}/deactivate/`,
  }),
};
