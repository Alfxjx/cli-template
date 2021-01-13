import axios from "axios";
import router from "../router/router.js";
import { Loading, Message } from "element-ui";
import Qs from "qs";
const { NODE_ENV, VUE_APP_PROD_API } = process.env;
let loadingInstance, clearLoading;
const baseUrl = NODE_ENV === "development" ? "/api" : `${VUE_APP_PROD_API}`;

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// 基本的axios实例
const axiosBase = axios.create({
  baseURL: baseUrl
});

// 配置了完善的拦截器，适合统一的后台接口
const axiosInstance = axios.create({
  baseURL: baseUrl
  // timeout: 30000,
});

axiosInstance.interceptors.request.use(function(config) {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    background: "transparent"
  });
  config.headers.authorization = sessionStorage.getItem("token");
  return config;
});

axiosInstance.interceptors.response.use(
  res => {
    clearTimeout(clearLoading);
    // 判断失误请求 httpCode=200
    if (res.data.code !== 0) {
      Message({
        message: res.data.message || "请求失败!",
        type: "error"
      });
      loadingInstance.close();
      return;
    }
    // 拦截返回值里面的新的token，用于刷新保持登录态。
    // 大小写敏感
    const newToken = res.headers.authorization;
    // console.log(newToken);
    if (newToken) {
      sessionStorage.setItem("token", newToken);
    }
    loadingInstance.close();
    return res.data;
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // Message({
          //   message: "无权限，请登录"
          // });
          sessionStorage.removeItem("token");
          router.push("/login");
          break;
        default:
          Message({
            message: "网络错误 - 请求失败"
          });
          break;
      }
    }
    loadingInstance.close();
  }
);

// 对于某些使用form格式接口的适配
function axiosFormRequest(url, data) {
  return axiosBase.post(url, Qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
    }
  });
}

export { axiosInstance, axiosBase, axiosFormRequest };
