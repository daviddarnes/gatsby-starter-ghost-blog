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
