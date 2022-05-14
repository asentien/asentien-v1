import { baseUrl, config } from "./baseServicesHandler";

export const baseService = {
  getUser: (username) => ({
    method: "get",
    url: `${baseUrl}/users/${username}/`,
  }),

  getFollowers: (username) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/users/${username}/followers/`,
  }),

  getFollowing: (username) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/users/${username}/following/`,
  }),
};
