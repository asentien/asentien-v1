import { baseUrl, config } from "./baseServicesHandler";

export const baseService = {
  
  getSearch: (searchString) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/search/?search=${searchString}`,
  }),

  getSearchPopular: (searchString) => ({
    method: "get",
    headers: config,
    url: `${baseUrl}/search/popular/?search=${searchString}`,
  }),
};
