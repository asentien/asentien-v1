import axios from "axios";

export const access = localStorage?.getItem("access")
  ? localStorage?.getItem("access")
  : null;

export const refresh = localStorage?.getItem("refresh")
  ? localStorage?.getItem("refresh")
  : null;

export const baseUrl = "api/v1";

export const config = {
  Authorization: `Bearer ${access}`,
  "Content-Type": "application/json",
  accept: "application/json",
};

const baseServicesHandler = async (baseService, nextUrl = null) => {
  const service = baseService;
  if (nextUrl) {
    service.url = nextUrl;
  }
  const { data } = await axios(service);
  return data;
};

export default baseServicesHandler;
