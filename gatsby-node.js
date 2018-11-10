const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const blogPostList = path.resolve('./src/templates/blog-list.js')
    resolve(
      graphql(
        `
          {
            allGhostPost(sort: { order: DESC, fields: [published_at] }) {
              edges {
                node {
                  html
                  title
                  slug
                  published_at(formatString: "DD MMMM, YYYY")
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allGhostPost.edges;
        const postsPerPage = 6
        const numPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: blogPostList,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1
            },
          })
        })

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.slug,
            component: blogPost,
            context: {
              slug: post.node.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}
