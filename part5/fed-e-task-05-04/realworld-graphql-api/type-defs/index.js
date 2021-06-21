const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @upper on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type User {
    email: String!
    # username: String! @deprecated(reason: "请使用 newUsername")
    username: String!
    bio: String
    image: String
    token: String
    following: Boolean
  }

  type UserPayload {
    user: User
  }

  type ArticlesPayload {
    articles: [Article!]
    articlesCount: Int!
  }

  type FeedArticlesPayload {
    feedArticles: [Article!]
    feedArticlesCount: Int!
  }

  type Profile {
    username: String!
    bio: String
    image: String
    following: Boolean!
    userId: String
  }

  type ProfilePayload {
    profile: Profile
  }

  type CommentsPayload {
    comments: [Comment!]
  }

  type Query {
    # foo: String @upper
    foo: String @auth @upper
    currentUser: User @auth
    profile(username: String!): Profile
    articles(offset: Int = 0, limit: Int = 2): ArticlesPayload
    article(slug: String): Article
    feedArticles(filter: articleFilter): FeedArticlesPayload @auth
    tags: TagsPayload
    comments(articleId: String): CommentsPayload
  }

  type TagsPayload {
    tags: [String!]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]
  }

  input articleFilter {
    tag: String
    author: String
    favorited: String
    limit: Int = 20
    offset: Int = 0
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    createdAt: String!
    updatedAt: String!
    favorited: Boolean!
    favoritesCount: Int!
    author: User!
  }

  type CreateArticlePayload {
    article: Article
  }

  input UpdateArticlePayload {
    title: String
    description: String
    body: String
  }

  type DeleteQuery {
    result: Boolean
  }

  type Comment {
    id: String!
    body: String!
    createdAt: String!
    updatedAt: String!
    author: User
  }

  input CreateCommentInput {
    body: String!
    articleId: String!
  }

  type CommentPayload {
    comment: Comment
  }

  type Mutation {
    # User
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
    updateUser(user: UpdateUserInput): UserPayload @auth
    followUser(username: String!): ProfilePayload @auth
    unfollowUser(username: String!): ProfilePayload @auth

    # Article
    createArticle(article: CreateArticleInput): CreateArticlePayload @auth
    updateArticle(
      slug: String
      partArticle: UpdateArticlePayload
    ): CreateArticlePayload @auth
    deleteArticle(slug: String): DeleteQuery @auth

    # Comment to Article
    createComment(comment: CreateCommentInput): CommentPayload @auth
    deleteComment(articleId: String, commentId: String): DeleteQuery @auth

    # Favorited to Article
    favoritedArticle(articleId: String): Article @auth
    unFavoritedArticle(articleId: String): Article @auth
  }
`;

module.exports = typeDefs;
