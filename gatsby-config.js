const path = require(`path`)

require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

if (!process.env.GHOST_API_URL || !process.env.GHOST_API_KEY) {
  throw new Error(
    `GHOST_API_URL and GHOST_API_KEY are required to build. Check the README.`
  )
}

module.exports = {
  siteMetadata: {
    title: `My Ghost Blog`,
    author: `David Darnes`,
    siteUrl: `https://gatsby-starter-ghost-blog.netlify.com`,
    description: `Just another blog, but this time it's different`,
  },
  pathPrefix: '/gatsby-starter-ghost-blog',
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allGhostPost } }) => {
              return allGhostPost.edges.map(edge => {
                return Object.assign({}, edge.node.plaintext, {
                  title: edge.node.title,
                  description: edge.node.plaintext.slice(0,208),
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allGhostPost(
                  limit: 1000,
                  sort: { order: DESC, fields: [published_at] },
                ) {
                  edges {
                    node {
                      html
                      title
                      slug
                      published_at(formatString: "DD MMMM, YYYY")
                      plaintext
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Ghost Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Ghost Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `${process.env.GHOST_API_URL}`,
        clientId: `ghost-frontend`,
        clientSecret: `${process.env.GHOST_API_KEY}`,
       },
    },
  ],
}
