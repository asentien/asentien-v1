export const baseRoutes = {
  index: "/",
  home: "/home",
  public: "/public",
  hashtags: "/hashtags",
  hashtagsAll: "/hashtags-all",
  mostLikedPosts: "/most-liked",
  postDetail: (postId) => `/post-${postId}`,
  postLikes: (postId) => `/post-${postId}-likes`,
  postComments: (postId) => `/post-${postId}-comments`,
  postShares: (postId) => `/post-${postId}-shares`,
  users: "/users",
  popularUsers: "/popular-users",
  userPosts: (username) => `/${username}`,
  faq: "/faq",
  terms: "/terms",
  privacy: "/privacy",
  privacyAndTerms: "/privacy-and-terms",
  login: "/login",
  signup: "/signup",
  notifications: "/notifications",
  search: "/search",
  settings: "/settings",
};

export const signupRoutes = [
  "/signup",
  "/register",
  "/join",
  "/create-account",
];

export const loginRoutes = ["/login", "/logon", "/signin"];

export const infoRoutes = ["/faq", "/terms", "/privacy", "/privacy-and-terms"];
