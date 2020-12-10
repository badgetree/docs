module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "../pages/",
      },
      __key: "pages",
    },
    "gatsby-transformer-remark",
  ],
};
