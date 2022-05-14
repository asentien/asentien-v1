import axios from "axios";
import { baseUrl, config, access } from "./baseServicesHandler";

export const baseService = {
  createLike: (postId) => ({
    method: "post",
    headers: config,
    url: `${baseUrl}/posts/${postId}/likes/`,
  }),

  createDislike: (postId) => ({
    method: "post",
    headers: config,
    url: `${baseUrl}/posts/${postId}/dislikes/`,
  }),

  createReport: (postId) => ({
    method: "post",
    headers: config,
    url: `${baseUrl}/posts/${postId}/create-report/`,
  }),

  createContact: (data) => ({
    data,
    method: "post",
    headers: config,
    url: `${baseUrl}/contact/create-contact/`,
  }),

  createComment: (data) => ({
    data,
    method: "post",
    headers: config,
    url: `${baseUrl}/posts/create-comment/`,
  }),

  createShare: (data) => ({
    data,
    method: "post",
    headers: config,
    url: `${baseUrl}/posts/create-share/`,
  }),

  getPublicFeed: {
    method: "get",
    url: `${baseUrl}/posts/public/`,
  },

  getReQueryPublicFeed: {
    method: "get",
    url: `${baseUrl}/posts/public/`,
  },

  getHomeFeed: {
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/home/`,
  },

  getReQueryHomeFeed: {
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/home/`,
  },

  getPopularFeed: {
    method: "get",
    url: `${baseUrl}/posts/popular/`,
  },

  getHashtagFeed: {
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/hashtags/`,
  },

  getHashtag: (hashtagString) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/hashtag/${hashtagString}`,
  }),

  getLikes: (postId) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/${postId}/likes/`,
  }),

  getPost: (postId) => ({
    method: "get",
    url: `${baseUrl}/posts/${postId}/`,
  }),

  getPostLikes: (postId) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/${postId}/likes/`,
  }),

  getUserPosts: (username) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/posts/${username}/posts/`,
  }),

  getComments: (postId) => ({
    method: "get",
    url: `${baseUrl}/posts/${postId}/comments/`,
  }),

  getShares: (postId) => ({
    method: "get",
    url: `${baseUrl}/posts/${postId}/shares/`,
  }),

  removeLike: (postId) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/posts/${postId}/likes/`,
  }),

  removeDislike: (postId) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/posts/${postId}/dislikes/`,
  }),

  removePost: (postId) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/posts/${postId}/delete/`,
  }),

  removePostAccelerator: (postId) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/posts/${postId}/delete/accelerator/`,
  }),
};

export const createContact = (subject, message) => {
  const createContactConfig = {
    headers: config,
  };

  let formData = new FormData();

  formData.append("subject", subject);
  formData.append("message", message);

  const completeRequest = axios.post(
    `${baseUrl}/contact/create-contact/`,
    formData,
    createContactConfig
  );

  const completedRequest = completeRequest.then((response) => response.data);
  return completedRequest;
};

export const createPost = (title, content, body) => {
  const createPostConfig = {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "multipart/form-data",
    },
  };

  let formData = new FormData();

  formData.append("title", title);
  if (content !== null) {
    formData.append("content", content);
  }
  formData.append("body", body);

  const completeRequest = axios.post(
    `${baseUrl}/posts/create-post/`,
    formData,
    createPostConfig
  );

  const completedRequest = completeRequest.then((response) => response.data);
  return completedRequest;
};
