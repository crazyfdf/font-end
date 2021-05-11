export default {
  /* 用户 */
  users: {
    /** 用户登录 ↓ **/
    login: {
      url: "users/login",
      auth: false,
      method: "POST",
      data: {
        // email: "",
        // password: "",
      },
    },
    /** 用户注册 ↓ **/
    register: {
      url: "users",
      auth: false,
      method: "POST",
      data: {
        // username:"",
        // email: "",
        // password: "",
      },
    },
  },
  /* 文章 */
  articles: {
    getArticles: {
      url: "articles",
      auth: false,
      method: "GET",
      data: {},
    },
    /* 关注文章 */
    feed: {
      url: "articles/feed",
      auth: true,
      method: "GET",
      data: {},
    },
  },
  /* 标签 */
  tags: {
    getTags: {
      url: "tags",
      auth: false,
      method: "GET",
      data: {},
    },
  },
};
import { request } from "/plugins/request.js";
// 点赞
export const addFavorite = slug => {
  return request({
    method: "POST",
    url: `articles/${slug}/favorite`,
  });
};

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: "DELETE",
    url: `articles/${slug}/favorite`,
  });
};

// 获取文章详情
export const getArticles = slug => {
  return request({
    method: "GET",
    url: `articles/${slug}`,
  });
};

// 获取文章评论
export const getComments = slug => {
  return request({
    method: "GET",
    url: `articles/${slug}/comments`,
  });
};
