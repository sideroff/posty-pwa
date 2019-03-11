import types from './types'

const fetchPosts = () => dispatch => {
  dispatch({ type: types.FETCH_POSTS })
  fetch('/posts').then(response => response.json()).then(posts => {
    dispatch({ type: types.FETCH_POSTS_SUCCESS, payload: posts })
  }).catch(error => {
    dispatch({ type: types.FETCH_POSTS_FAILURE, payload: error })
  })
}

const addPost = post => dispatch => {
  fetch('/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  }).then(response => response.json()).then(responsePost => {
    dispatch({ type: types.ADD_POST_SUCCESS, payload: responsePost })
  }).catch(error => {
    dispatch({ type: types.ADD_POST_FAILURE, payload: error })
  })
}

export {
  fetchPosts,
  addPost,
}