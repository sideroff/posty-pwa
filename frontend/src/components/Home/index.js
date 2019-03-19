import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts, addPost } from '../../actions'

import Loading from '../Loading'

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
      <div class='wrapper'>
        <h3>posty</h3>
        <button onClick={() => this.fetchPosts()} disabled={this.props.isFetchingPosts}>get posts</button>

        <Loading isLoading={this.props.isFetchingPosts} />
        <div className="post-addition-form">
          <div className="post-title-input">
            <input value={this.state.postTitle} onChange={this.postTitleChange} placeholder="Post title" type="text" />
          </div>

          <button onClick={this.submitPost}>Submit</button>

        </div>

        <div className="posts">
          {this.props.posts.map(post =>
            //compound key because of offline support (no id)
            <div className={'post ' + (post.$isNotPersisted ? 'not-persisted' : '')} key={(post.id || '') + post.title}>
              <div>id: {post.id}</div>
              <div>title: {post.title}</div>
              <div>is persisted: {(!post.$isNotPersisted).toString()}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  posts: state.posts.feed,
  isFetchingPosts: state.posts.isFetchingPosts
}), dispatch => ({ dispatch }))(Home)