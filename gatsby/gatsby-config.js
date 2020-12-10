module.exports = {
  pathPrefix: "/docs",
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "../images/",
      },
      __key: "images",
    },"gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "../pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-table-of-contents",
            options: {
              exclude: "Table of Contents",
              tight: true,
              ordered: false,
              className: "table-of-contents",
            },
          },
          "gatsby-remark-autolink-headers",
          "gatsby-remark-mermaid",
        ],
      },
    },
  ],
};
