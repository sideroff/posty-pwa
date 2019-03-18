import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  ADD_POST_SUCCESS
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

    default:
      return state;
  }
}