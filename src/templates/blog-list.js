import React from "react"
import Helmet from 'react-helmet'
import { Link, graphql } from "gatsby"
import get from 'lodash/get'

import Layout from '../components/Layout'
import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

export default class BlogList extends React.Component {
  render() {
    const posts = get(this, 'props.data.allGhostPost.edges')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        {posts.map(({ node }) => {
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.slug}>
                  {node.title}
                </Link>
              </h3>
              <small>{node.published_at}</small>
              <p dangerouslySetInnerHTML={{ __html: `${node.plaintext.slice(0,208)}...` }} />
            </div>
          )
        })}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
        {
          !isFirst &&
          <Link to={prevPage} rel="prev">← Previous Page</Link>
        }
        {
          !isLast &&
          <Link to={nextPage} rel="next">Next Page →</Link>
        }
        </ul>
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
query PaginationQuery($skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
      description
    }
  }
  allGhostPost(
    sort: { order: DESC, fields: [published_at] }
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        plaintext
        title
        slug
        published_at(formatString: "DD MMMM, YYYY")
      }
    }
  }
}
`
