import apiList from "../request/api";
import axios from "axios";
function getApiObj(url) {
  let apiArray = url.split("/");
  let api = apiList;
  apiArray.forEach(v => {
    api = api[v];
  });
  return api;
}
export const request = axios.create({
  baseURL: "https://conduit.productionready.io/api/",
});
export const api = (url, data = {}) => {
  let api = getApiObj(url);
  return request.request({
    url: api.url,
    data,
    method: api.method,
  });
};
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(config => {
    const { user } = store.state;
    if (user && user.token) {
      config.headers = {
        Authorization: `Token ${user.token}`,
      };
    }
    return config;
  });
  // 响应拦截器
  request.interceptors.response.use(res => {
    return res;
  });
};
