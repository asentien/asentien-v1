import { createSlice } from "@reduxjs/toolkit";

import baseServicesHandler from "../services/baseServicesHandler";
import { baseService } from "../services/postServices";

import { setLoading, setToast, unsetLoading } from "./ui";

import { reduceById, reduceToIds } from "../utils";

const NAMESPACE = "post";

export const key = {
  publicFeed: "publicFeed",
  publicFeedNext: "publicFeedNext",
  popularFeed: "popularFeed",
  popularFeedNext: "popularFeedNext",
  homeFeed: "homeFeed",
  homeFeedNext: "homeFeedNext",
  hashtagFeed: "hashtagFeed",
  hashtagFeedNext: "hashtagFeedNext",
  hashtag: "hashtag",
  hashtagNext: "hashtagNext",
  dislike: (postId) => `dislike_${postId}`,
  like: (postId) => `like_${postId}`,
  report: (postId) => `report_${postId}`,
  post: "post",
  postDetail: (postId) => `postDetail_${postId}`,
  postLikes: (postId) => `postLikes_${postId}`,
  postLikesNext: (postId) => `postLikesNext_${postId}`,
  userPosts: (username) => `userPosts_${username}`,
  userPostsNext: (username) => `userPostsNext_${username}`,
  removePost: "removePost",
  removePostAccelerator: "removePostAccelerator",
  comments: (postId) => `comments_${postId}`,
  commentsNext: (postId) => `commentsNext_${postId}`,
  comment: (parentId) => `comment_${parentId}`,
  shares: (postId) => `shares_${postId}`,
  sharesNext: (postId) => `sharesNext_${postId}`,
  share: (parentId) => `share_${parentId}`,
};

const initialState = {
  publicFeed: {
    count: 0,
    next: null,
    results: [],
  },
  popularFeed: {
    count: 0,
    next: null,
    results: [],
  },
  homeFeed: {
    count: 0,
    next: null,
    results: [],
  },
  hashtagFeed: {
    count: 0,
    next: null,
    results: [],
  },
  hashtag: {
    count: 0,
    next: null,
    results: [],
  },
  hashtagString: "",
  postById: {},
  postLikes: {},
  userPosts: {},
  commentsByPostId: {},
  sharesByPostId: {},
};

const postSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setPublicFeed: (state, { payload }) => {
      state.publicFeed.next = payload.next;
      state.publicFeed.results.push(...reduceToIds(payload.results));
    },
    setPopularFeed: (state, { payload }) => {
      state.popularFeed.next = payload.next;
      state.popularFeed.results.push(...reduceToIds(payload.results));
    },
    setReQueryPublicFeed: (state, { payload }) => {
      state.publicFeed.next = payload.next;
      state.publicFeed.results.push(...reduceToIds(payload.results));
    },
    setClearPublicFeed: (state) => {
      state.publicFeed.count = 0;
      state.publicFeed.next = null;
      state.publicFeed.results = [];
    },
    setHomeFeed: (state, { payload }) => {
      state.homeFeed.next = payload.next;
      state.homeFeed.results.push(...reduceToIds(payload.results));
    },
    setReQueryHomeFeed: (state, { payload }) => {
      state.homeFeed.next = payload.next;
      state.homeFeed.results.push(...reduceToIds(payload.results));
    },
    setClearHomeFeed: (state) => {
      state.homeFeed.count = 0;
      state.homeFeed.next = null;
      state.homeFeed.results = [];
    },
    setHashtagFeed: (state, { payload }) => {
      state.hashtagFeed.next = payload.next;
      state.hashtagFeed.results.push(...reduceToIds(payload.results));
    },
    setHashtag: (state, { payload }) => {
      state.hashtag.next = payload.next;
      state.hashtag.results.push(...reduceToIds(payload.results));
    },
    setClearHashtag: (state) => {
      state.hashtag.results = [];
      state.hashtag.next = null;
      state.hashtag.count = 0;
    },
    setClearHashtagString: (state) => {
      state.hashtagString = "";
    },
    setHashtagNext: (state, { payload }) => {
      state.hashtag.next = payload.next;
      state.hashtag.results.push(...reduceToIds(...payload.results));
    },
    setHashtagString: (state, { payload }) => {
      state.hashtagString = payload;
    },
    setLike: (state, { payload }) => {
      const { postId, userId } = payload;
      state.postById[postId].likes.push(userId);
    },
    setDislike: (state, { payload }) => {
      const { postId, userId } = payload;
      state.postById[postId].dislikes.push(userId);
    },
    setPost: (state, { payload }) => {
      state.homeFeed.results = [payload.id, ...state.homeFeed.results];
      const newPayload = {
        ...payload,
        comment_ids: [],
        share_ids: [],
      };
      state.postById[payload.id] = newPayload;
    },
    setPublicPost: (state, { payload }) => {
      state.publicFeed.results = [payload.id, ...state.publicFeed.results];
      const newPayload = {
        ...payload,
        comment_ids: [],
        share_ids: [],
      };
      state.postById[payload.id] = newPayload;
    },
    setHashtagsPost: (state, { payload }) => {
      state.hashtagFeed.results = [payload.id, ...state.hashtagFeed.results];
      const newPayload = {
        ...payload,
        comment_ids: [],
        share_ids: [],
      };
      state.postById[payload.id] = newPayload;
    },
    setUserPost: (state, { payload }) => {
      const profile = state.userPosts[payload.author.username];
      if (profile) {
        state.userPosts[payload.author.username].results = [
          payload.id,
          ...profile.results,
        ];
      }
      const newPayload = {
        ...payload,
        comment_ids: [],
        share_ids: [],
      };
      state.postById[payload.id] = newPayload;
    },
    setPostById: (state, { payload }) => {
      state.postById = { ...state.postById, ...reduceById(payload.results) };
    },
    setPostDetail: (state, { payload }) => {
      state.postById[payload.id] = payload;
      state.postById = { ...state.postById, ...payload.results };
    },
    setPostLikes: (state, { payload }) => {
      const { data, postId } = payload;
      if (!state.postLikes[postId]) {
        state.postLikes[postId] = { results: [] };
      }
      state.postLikes[postId].next = data.next;
      state.postLikes[postId].results.push(...data.results);
    },
    setUserPosts: (state, { payload }) => {
      const { data, username } = payload;
      if (!state.userPosts[username]) {
        state.userPosts[username] = { results: [] };
      }
      state.userPosts[username].next = data.next;
      state.userPosts[username].results.push(...reduceToIds(data.results));
    },
    setComments: (state, { payload }) => {
      const { data, postId } = payload;
      if (!state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = { results: [] };
      }
      const results = reduceToIds(data.results);
      state.commentsByPostId[postId].next = data.next;
      state.commentsByPostId[postId].results = [
        ...state.commentsByPostId[postId].results,
        ...results,
      ];
    },
    setShares: (state, { payload }) => {
      const { data, postId } = payload;
      if (!state.sharesByPostId[postId]) {
        state.sharesByPostId[postId] = { results: [] };
      }
      const results = reduceToIds(data.results);
      state.sharesByPostId[postId].next = data.next;
      state.sharesByPostId[postId].results = [
        ...state.sharesByPostId[postId].results,
        ...results,
      ];
    },
    setComment: (state, { payload }) => {
      state.postById[payload.id] = payload;
      state.commentsByPostId[payload.parent.id].results.push(payload.id);
    },
    setShare: (state, { payload }) => {
      state.postById[payload.id] = payload;
      state.sharesByPostId[payload.parent.id].results.push(payload.id);
    },
    unsetLike: (state, { payload }) => {
      const { postId, userId } = payload;
      const { likes } = state.postById[postId];
      state.postById[postId].likes = likes.filter((k) => k !== userId);
    },
    unsetDislike: (state, { payload }) => {
      const { postId, userId } = payload;
      const { dislikes } = state.postById[postId];
      state.postById[postId].dislikes = dislikes.filter((k) => k !== userId);
    },
    unsetPost: (state, { payload }) => {
      const { postId, username } = payload;
      state.publicFeed.results = state.publicFeed.results.filter(
        (id) => id !== postId
      );
      state.popularFeed.results = state.popularFeed.results.filter(
        (id) => id !== postId
      );
      state.homeFeed.results = state.homeFeed.results.filter(
        (id) => id !== postId
      );
      state.hashtagFeed.results = state.hashtagFeed.results.filter(
        (id) => id !== postId
      );
      const profile = state.userPosts[username];
      if (profile) {
        const newIds = profile.results.filter((id) => id !== postId);
        state.userPosts[username].results = newIds;
      }
      delete state.postById[postId];
    },
    unsetComment: (state, { payload }) => {
      const { parentId, postId } = payload;
      const newIds = state.commentsByPostId[parentId].results.filter(
        (id) => id !== postId
      );
      state.commentsByPostId[parentId].results = newIds;
      delete state.postById[postId];
    },
    unsetShare: (state, { payload }) => {
      const { parentId, postId } = payload;
      const newIds = state.sharesByPostId[parentId].results.filter(
        (id) => id !== postId
      );
      state.sharesByPostId[parentId].results = newIds;
      delete state.postById[postId];
    },
  },
});

const { actions, reducer } = postSlice;
export const {
  setPublicFeed,
  setReQueryPublicFeed,
  setClearPublicFeed,
  setPopularFeed,
  setHomeFeed,
  setReQueryHomeFeed,
  setClearHomeFeed,
  setHashtagFeed,
  setHashtag,
  setClearHashtag,
  setClearHashtagString,
  setHashtagNext,
  setHashtagString,
  setLike,
  setDislike,
  setPost,
  setPublicPost,
  setHashtagsPost,
  setUserPost,
  setPostLikes,
  setPostById,
  setPostDetail,
  setUserPosts,
  setComments,
  setShares,
  setComment,
  setShare,
  unsetLike,
  unsetDislike,
  unsetPost,
  unsetComment,
  unsetShare,
} = actions;
export default reducer;

export const selectPublicFeed = (state) => state.post.publicFeed;

export const selectPopularFeed = (state) => state.post.popularFeed;

export const selectHomeFeed = (state) => state.post.homeFeed;

export const selectHashtagFeed = (state) => state.post.hashtagFeed;

export const selectHashtag = (state) => state.post.hashtag;

export const selectHashtagString = (state) => state.post.hashtagString;

export const selectLikedByUser = (state, postId, userId) =>
  state?.post?.postById[postId]?.likes?.includes(userId);

export const selectDislikedByUser = (state, postId, userId) =>
  state?.post?.postById[postId]?.dislikes?.includes(userId);

export const selectPost = (state, postId) => state.post.postById[postId];

export const selectPostLikes = (state, postId) => {
  const postLikes = state?.post?.postLikes[postId];
  if (postLikes === undefined) {
    return { count: 0, results: [] };
  }
  return postLikes;
};

export const selectUserPosts = (state, username) => {
  const userPosts = state?.post?.userPosts[username];
  if (userPosts === undefined) {
    return { count: 0, results: [] };
  }
  return userPosts;
};

export const selectComments = (state, postId) => {
  const comments = state?.post?.commentsByPostId[postId];
  if (comments === undefined) {
    return {};
  }
  return comments;
};

export const selectShares = (state, postId) => {
  const shares = state?.post?.sharesByPostId[postId];
  if (shares === undefined) {
    return {};
  }
  return shares;
};

export const createLike = (postId, userId) => async (dispatch) => {
  const thisKey = key.like(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.createLike(postId));
    dispatch(setLike({ postId, userId }));
  } catch (error) {
    dispatch(setToast("Failed to Like", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createDislike = (postId, userId) => async (dispatch) => {
  const thisKey = key.dislike(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.createDislike(postId));
    dispatch(setDislike({ postId, userId }));
  } catch (error) {
    dispatch(setToast("Failed to Dislike", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createReport = (postId, userId) => async (dispatch) => {
  const thisKey = key.report(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.createReport(postId));
    dispatch(setToast("Reported"));
  } catch (error) {
    dispatch(setToast("Failed to Report", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createComment = (author, body, parentId) => async (dispatch) => {
  const thisKey = key.comment(parentId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.createComment({
        body,
        is_comment: true,
        is_share: false,
        parent_id: parentId,
      })
    );
    dispatch(setComment(data));
    dispatch(setToast("Comment Sent"));
  } catch (error) {
    dispatch(setToast("Failed to Comment", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createShare = (author, body, parentId) => async (dispatch) => {
  const thisKey = key.share(parentId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.createShare({
        body,
        is_comment: false,
        is_share: true,
        parent_id: parentId,
      })
    );
    dispatch(setShare(data));
    dispatch(setToast("Share Sent"));
  } catch (error) {
    dispatch(setToast("Failed to Share", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getPublicFeed =
  (nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.publicFeed;
    if (nextUrl) {
      thisKey = key.publicFeedNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getPublicFeed,
        nextUrl
      );
      dispatch(setPostById(data));
      dispatch(setPublicFeed(data));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getReQueryPublicFeed = () => async (dispatch) => {
  let thisKey = key.publicFeed;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.getReQueryPublicFeed);
    dispatch(setPostById(data));
    dispatch(setReQueryPublicFeed(data));
  } catch (error) {
    dispatch(setToast("Failed to Load", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getPopularFeed =
  (nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.popularFeed;
    if (nextUrl) {
      thisKey = key.popularFeedNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getPopularFeed,
        nextUrl
      );
      dispatch(setPostById(data));
      dispatch(setPopularFeed(data));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getHomeFeed =
  (nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.homeFeed;
    if (nextUrl) {
      thisKey = key.homeFeedNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(baseService.getHomeFeed, nextUrl);
      dispatch(setPostById(data));
      dispatch(setHomeFeed(data));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getReQueryHomeFeed = () => async (dispatch) => {
  let thisKey = key.homeFeed;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.getReQueryHomeFeed);
    dispatch(setPostById(data));
    dispatch(setReQueryHomeFeed(data));
  } catch (error) {
    dispatch(setToast("Failed to Load", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getHashtagFeed =
  (nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.hashtagFeed;
    if (nextUrl) {
      thisKey = key.hashtagFeedNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getHashtagFeed,
        nextUrl
      );
      dispatch(setPostById(data));
      dispatch(setHashtagFeed(data));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getHashtag =
  (hashtagString, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.hashtag;
    if (nextUrl) {
      thisKey = key.hashtagNext;
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getHashtag(hashtagString),
        nextUrl
      );
      dispatch(setPostById(data));
      dispatch(setHashtag(data));
      dispatch(setHashtagString(hashtagString));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getPostDetail = (postId) => async (dispatch) => {
  const thisKey = key.postDetail(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(baseService.getPost(postId));
    dispatch(setPostDetail(data));
  } catch (error) {
    dispatch(setToast("Failed to Load", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getPostLikes =
  (postId, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.postLikes(postId);
    if (nextUrl) {
      thisKey = key.postLikesNext(postId);
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getPostLikes(postId),
        nextUrl
      );
      dispatch(setPostLikes({ data, postId }));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getUserPosts =
  (username, nextUrl = null) =>
  async (dispatch) => {
    let thisKey = key.userPosts(username);
    if (nextUrl) {
      thisKey = key.userPostsNext(username);
    }
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      const data = await baseServicesHandler(
        baseService.getUserPosts(username),
        nextUrl
      );
      dispatch(setPostById(data));
      dispatch(setUserPosts({ data, username }));
    } catch (error) {
      dispatch(setToast("Failed to Load", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const getComments = (postId, nextUrl) => async (dispatch) => {
  let thisKey = key.comments(postId);
  if (nextUrl) {
    thisKey = key.commentsNext(postId);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.getComments(postId),
      nextUrl
    );
    dispatch(setPostById(data));
    dispatch(setComments({ data, postId }));
  } catch (error) {
    dispatch(setToast("Failed to Load", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getShares = (postId, nextUrl) => async (dispatch) => {
  let thisKey = key.shares(postId);
  if (nextUrl) {
    thisKey = key.sharesNext(postId);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await baseServicesHandler(
      baseService.getShares(postId),
      nextUrl
    );
    dispatch(setPostById(data));
    dispatch(setShares({ data, postId }));
  } catch (error) {
    dispatch(setToast("Failed to Load", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeLike = (postId, userId) => async (dispatch) => {
  const thisKey = key.like(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removeLike(postId));
    dispatch(unsetLike({ postId, userId }));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeDislike = (postId, userId) => async (dispatch) => {
  const thisKey = key.dislike(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removeDislike(postId));
    dispatch(unsetDislike({ postId, userId }));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removePost = (postId, username) => async (dispatch) => {
  const thisKey = key.removePost;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removePost(postId));
    dispatch(unsetPost({ postId, username }));
    dispatch(setToast("Post Deactivated"));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeComment = (postId, parentId) => async (dispatch) => {
  const thisKey = key.removePost;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removePost(postId));
    dispatch(unsetComment({ postId, parentId }));
    dispatch(setToast("Comment Deactivated"));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeShare = (postId, parentId) => async (dispatch) => {
  const thisKey = key.removePost;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removePost(postId));
    dispatch(unsetShare({ postId, parentId }));
    dispatch(setToast("Share Deactivated"));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removePostAccelerator = (postId, username) => async (dispatch) => {
  const thisKey = key.removePostAccelerator;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await baseServicesHandler(baseService.removePostAccelerator(postId));
    dispatch(unsetPost({ postId, username }));
    dispatch(setToast("Post Deactivated"));
  } catch (error) {
    dispatch(setToast("Failed to Deactivate", "secondary"));
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeCommentAccelerator =
  (postId, parentId) => async (dispatch) => {
    const thisKey = key.removePostAccelerator;
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      await baseServicesHandler(baseService.removePostAccelerator(postId));
      dispatch(unsetComment({ postId, parentId }));
      dispatch(setToast("Comment Deactivated"));
    } catch (error) {
      dispatch(setToast("Failed to Deactivate", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };

export const removeShareAccelerator =
  (postId, parentId) => async (dispatch) => {
    const thisKey = key.removePostAccelerator;
    try {
      dispatch(setLoading(NAMESPACE, thisKey));
      await baseServicesHandler(baseService.removePostAccelerator(postId));
      dispatch(unsetShare({ postId, parentId }));
      dispatch(setToast("Share Deactivated"));
    } catch (error) {
      dispatch(setToast("Failed to Deactivate", "secondary"));
    } finally {
      dispatch(unsetLoading(NAMESPACE, thisKey));
    }
  };
