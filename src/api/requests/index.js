import { axiosBase /*, axiosInstance */ } from "../config";

export const example = data => {
  return axiosBase.post("/example/url", data);
};
