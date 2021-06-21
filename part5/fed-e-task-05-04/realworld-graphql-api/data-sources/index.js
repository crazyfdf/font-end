const dbModel = require("../models");
const Users = require("./user");
const Articles = require("./article");
const Comments = require("./comment");

module.exports = () => {
  return {
    users: new Users(dbModel.User),
    articles: new Articles(dbModel.Article),
    comments: new Comments(dbModel.Comment),
  };
};
