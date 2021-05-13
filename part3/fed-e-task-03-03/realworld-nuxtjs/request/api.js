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
    /** 更新用户 ↓ **/
    update: { url: "user", auth: true, method: "PUT", data: {} },
  },
  /* 文章 */
  articles: {
    /* 获取文章 */
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
    /* 创建文章 */
    create: {
      url: "articles",
      auth: true,
      method: "POST",
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

// 获取用户信息
export const getUser = username => {
  return request({
    method: "GET",
    url: `profiles/${username}`,
  });
};

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

// 关注
export const addFollow = username => {
  return request({
    method: "POST",
    url: `profiles/${username}/follow`,
  });
};

// 取消关注
export const deleteFollow = username => {
  return request({
    method: "DELETE",
    url: `profiles/${username}/follow`,
  });
};

// 获取文章详情
export const getArticles = slug => {
  return request({
    method: "GET",
    url: `articles/${slug}`,
  });
};

// 发布文章评论
export const createComments = (slug, data) => {
  return request({
    method: "POST",
    url: `articles/${slug}/comments`,
    data,
  });
};

// 获取文章评论
export const getComments = slug => {
  return request({
    method: "GET",
    url: `articles/${slug}/comments`,
  });
};

// 删除文章评论
export const deleteComments = (slug, id) => {
  return request({
    method: "DELETE",
    url: `articles/${slug}/comments/${id}`,
  });
};

// 更新文章
export const updateArticles = slug => {
  return request({
    method: "GET",
    url: `articles/${slug}`,
  });
};

// 删除文章
export const deleteArticles = slug => {
  return request({
    method: "DELETE",
    url: `articles/${slug}`,
  });
};
