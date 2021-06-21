const { MongoDataSource } = require("apollo-datasource-mongodb");

class Comments extends MongoDataSource {
  createComment(data) {
    const comment = new this.model(data);
    // comment.populate('author').execPopulate()
    return comment.save();
  }

  async deleteComment(options) {
    return this.model.deleteOne({
      _id: options.commentId,
    });
  }

  getComments({ articleId }) {
    return this.model.find({ articleId });
  }
}

module.exports = Comments;
