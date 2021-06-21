module.exports = {
  Query: {
    async comments(parent, { articleId }, { dataSources }) {
      const comments = await dataSources.comments.getComments({ articleId });
      return {
        comments,
      };
    },
  },
  Mutation: {
    async createComment(parent, { comment }, { dataSources, user }) {
      comment.author = user._id;
      const ret = await dataSources.comments.createComment(
        // 根据 用户 ID 获取用户信息填充到 comment.author 中
        comment
      );
      return {
        comment: ret,
      };
    },
    async deleteComment(
      parent,
      { articleId, commentId },
      { dataSources, user }
    ) {
      let ret = await dataSources.comments.deleteComment({
        articleId,
        commentId,
      });
      ret.ok = ret.deletedCount === 1 ? true : false;
      return {
        result: ret.ok,
      };
    },
  },
  Comment: {
    async author(parent, args, { dataSources }) {
      const user = await dataSources.users.findById(parent.author);
      return user;
    },
  },
};
