import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn’t exist... the sadness. <Link to='/'>Let’s go back home</Link></p>
      </Layout>
    )
  }
}

export default NotFoundPage
