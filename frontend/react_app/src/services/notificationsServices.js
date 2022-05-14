import { baseUrl, config } from "./baseServicesHandler";

export const baseService = {
  getNotifications: {
    method: "get",
    headers: config,
    url: `${baseUrl}/notifications/`,
  },

  getUnreadNotificationsCount: {
    method: "get",
    headers: config,
    url: `${baseUrl}/notifications/unread-count/`,
  },

  removeNotification: (notificationId) => ({
    method: "delete",
    headers: config,
    url: `${baseUrl}/notifications/${notificationId}/`,
  }),
};
