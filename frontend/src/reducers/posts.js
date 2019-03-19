import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  ADD_POST_SUCCESS,
  REMOVE_OFFLINE_POST
} from './../actions/types';

const defaultState = {
  feed: [],
  isFetchingPosts: false,
  isAddingPost: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, {
        isFetchingPosts: true,
        feed: [],
      });
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        feed: action.payload,
        isFetchingPosts: false
      });

    case ADD_POST_SUCCESS:
      return Object.assign({}, state, {
        feed: [...state.feed, action.payload],
        isAddingPost: false
      });
    case REMOVE_OFFLINE_POST:
      return Object.assign({}, state, {
        feed: [...state.feed.filter(x => x.$id !== action.payload)]
      })

    default:
      return state;
  }
}