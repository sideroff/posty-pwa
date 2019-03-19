import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,

  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_OFFLINE_POST,


} from './types'


const getOfflineActions = () => {
  return JSON.parse(localStorage.getItem('offlineActions') || '[]')
}

const setOfflineActions = offlineActions => {
  return localStorage.setItem('offlineActions', JSON.stringify(offlineActions))
}

const addToOfflineActions = action => {
  let offlineActions = getOfflineActions();

  offlineActions.push(action)

  setOfflineActions(offlineActions);
}

const fetchPosts = () => dispatch => {
  dispatch({ type: FETCH_POSTS })
  fetch('/posts').then(response => response.json()).then(posts => {
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: posts })
  }).catch(error => {
    dispatch({ type: FETCH_POSTS_FAILURE, payload: error })
  })
}

const addPost = post => (dispatch, getState) => {
  let addPostAction = { type: ADD_POST, payload: post }
  dispatch(addPostAction)

  if (getState().flags.networkStatus === 'offline') {
    addPostAction.payload.$isNotPersisted = true;
    addPostAction.payload.$id = Date.now();
    addToOfflineActions(addPostAction)
    return dispatch({ type: ADD_POST_SUCCESS, payload: addPostAction.payload })
  }



  if (post.$id) {
    dispatch({ type: REMOVE_OFFLINE_POST, payload: post.$id })
  }

  // remove posts with isNotPersisted flag set to true
  fetch('/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  }).then(response => response.json()).then(responsePost => {
    dispatch({ type: ADD_POST_SUCCESS, payload: responsePost })
  }).catch(error => {
    dispatch({ type: ADD_POST_FAILURE, payload: error })
  })
}

const persistOfflineActions = () => dispatch => {
  let offlineActions = getOfflineActions();
  setOfflineActions([]);

  offlineActions.forEach(({ type, payload }) => {

    delete payload.$isNotPersisted;

    dispatch(actionToThunkMap[type](payload))
  })
}

const actionToThunkMap = {
  [FETCH_POSTS]: fetchPosts,
  [ADD_POST]: addPost
}

export {
  fetchPosts,
  addPost,
  persistOfflineActions,
  actionToThunkMap
}
