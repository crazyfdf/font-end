module.exports = {
  Query: {
    async articles(parent, { offset, limit }, { dataSources }) {
      // return {};
      const [articles, articlesCount] = await Promise.all([
        dataSources.articles.getArticles({
          offset,
          limit,
        }),
        dataSources.articles.getCount(),
      ]);
      return {
        articles,
        articlesCount,
      };
    },
    async feedArticles(
      parent,
      { filter: { offset, limit, tag, author, favorited } },
      { dataSources }
    ) {
      const extraCondition = { tag };
      if (author) {
        const { _id: authorId } = await dataSources.users.findByUsername(
          author
        );
        extraCondition.author = authorId;
      }
      if (favorited) {
        const { _id: favoritedId } = await dataSources.users.findByUsername(
          favorited
        );
        extraCondition.favorited = favoritedId;
      }

      const feedArticles = await dataSources.articles.getFeedArticles({
        offset,
        limit,
        ...extraCondition,
      });
      const feedArticlesCount = feedArticles.length;
      return {
        feedArticles,
        feedArticlesCount,
      };
    },
    async article(parent, { slug }, { dataSources }) {
      const ret = await dataSources.articles.getArticle(slug);
      return ret;
    },
    async tags(parent, args, { dataSources }) {
      const articles = await dataSources.articles.getAllArticles();
      let tags = articles.reduce((accu, article) => {
        return accu.concat(article.tagList);
      }, []);
      tags = [...new Set(tags)];
      return {
        tags,
      };
    },
  },
  Mutation: {
    async createArticle(parent, { article }, { dataSources, user }) {
      article.author = user._id;
      const ret = await dataSources.articles.createArticle(
        // 根据 用户 ID 获取用户信息填充到 article.author 中
        article
      );
      return {
        article: ret,
      };
    },
    async updateArticle(parent, { partArticle, slug }, { dataSources, user }) {
      partArticle.author = user._id;
      const ret = await dataSources.articles.updateArticle(slug, partArticle);
      return {
        article: ret,
      };
    },
    async deleteArticle(parent, { slug }, { dataSources, user }) {
      let ret = await dataSources.articles.deleteArticle(slug);
      ret.ok = ret.deleteCount === 1 ? true : false;
      return {
        result: ret.ok,
      };
    },
    async favoritedArticle(parent, { articleId }, { dataSources, user }) {
      let article = await dataSources.articles.favoritedArticle({ articleId });
      return article;
    },
    async unFavoritedArticle(parent, { articleId }, { dataSources, user }) {
      let article = await dataSources.articles.unFavoritedArticle({
        articleId,
      });
      return article;
    },
  },
  Article: {
    async author(parent, args, { dataSources }) {
      const user = await dataSources.users.findById(parent.author);
      return user;
    },
  },
  ArticlesPayload: {
    async articles(parent, { offset, limit }, { dataSources }) {
      const articles = await dataSources.articles.getArticles({
        offset,
        limit,
      });
      return articles;
    },
    async articlesCount(parent, args, { dataSources }) {
      const count = await dataSources.articles.getCount();
      return count;
    },
  },
};
