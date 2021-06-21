const { MongoDataSource } = require("apollo-datasource-mongodb");

class Articles extends MongoDataSource {
  createArticle(data) {
    const article = new this.model(data);
    // article.populate('author').execPopulate()
    return article.save();
  }

  async updateArticle(articleId, articleData) {
    return this.model.findOneAndUpdate(
      {
        _id: articleId,
      },
      articleData,
      {
        new: true, // 默认返回更新之前的数据，配置为 true 返回更新之后的数据
      }
    );
  }

  async deleteArticle(articleId) {
    return this.model.deleteOne({
      _id: articleId,
    });
  }

  getArticles(options) {
    return this.model.find().skip(options.offset).limit(options.limit);
  }

  getAllArticles() {
    return this.model.find();
  }

  getFeedArticles(options) {
    return this.model.find({
      tagList: options.tag,
      author: options.author,
      favorited: options.favorited,
    });
    // .skip(options.offset)
    // .limit(options.limit);
  }

  getCount() {
    return this.model.countDocuments();
  }

  getArticle(articleId) {
    return this.model.findById(articleId);
  }

  async favoritedArticle({ articleId }) {
    let article = await this.getArticle(articleId);
    article = article.toObject();
    article.favorited = true;
    article.favoritesCount++;
    return this.updateArticle(articleId, article);
  }

  async unFavoritedArticle({ articleId }) {
    let article = await this.getArticle(articleId);
    article = article.toObject();
    if (article.favoritesCount <= 1) {
      article.favorited = false;
      article.favoritesCount = 0;
    } else {
      article.favorited = true;
      article.favoritesCount--;
    }
    return this.updateArticle(articleId, article);
  }
}

module.exports = Articles;
