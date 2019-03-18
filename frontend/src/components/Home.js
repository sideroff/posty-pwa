import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts, addPost } from './../actions'

import { Loading } from './index'

import "./Home.css"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postTitle: ''
    }

    this.postTitleChange = this.postTitleChange.bind(this)
    this.submitPost = this.submitPost.bind(this)
  }

  postTitleChange(event) {
    this.setState({
      postTitle: event.target.value
    })
  }

  submitPost(event) {
    this.props.dispatch(addPost({ title: this.state.postTitle, author: 1 }))
  }

  fetchPosts() {
    this.props.dispatch(fetchPosts());
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div>
        <div>home page</div>
        <button onClick={() => this.fetchPosts()} disabled={this.props.isFetchingPosts}>get postss</button>

        <Loading isLoading={this.props.isFetchingPosts} />
        <div className="post-addition-form">
          <div className="post-title-input">
            <input value={this.state.postTitle} onChange={this.postTitleChange} placeholder="Post title" type="text" />
          </div>

          <button onClick={this.submitPost}>Submit</button>

        </div>

        <div className="posts">
          {this.props.posts.map(post =>
            <div className="post" key={post.id}>
              <div>id: {post.id}</div>
              <div>title: {post.title}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}



export default connect(state => ({ posts: state.posts.feed, isFetchingPosts: state.posts.isFetchingPosts }), dispatch => ({ dispatch }))(Home)

// export default () => {
//   return (
//     <div>hello from home</div>
//   )
// }