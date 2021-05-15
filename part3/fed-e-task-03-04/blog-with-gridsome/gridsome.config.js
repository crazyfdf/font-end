module.exports = {
  siteName: "拉勾教育",
  siteDescription: "大前端",
  plugins: [
    {
      use: "@gridsome/source-strapi",
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ["post", "tag"],
        singleTypes: ["general"],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: "",
        //   password: "",
        // },
      },
    },
  ],
  templates: {
    StrapiPost: [
      {
        path: "/post/:id",
        component: "./src/templates/Post.vue",
      },
    ],
    StrapiTag: [
      {
        path: "/tag/:id",
        component: "./src/templates/Tag.vue",
      },
    ],
  },
};
