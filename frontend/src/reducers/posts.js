import types from './../actions/types';

const defaultState = {
  feed: [],
  isFetchingPosts: false,
  isAddingPost: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return Object.assign({}, state, {
        isFetchingPosts: true,
        feed: [],
      });
    case types.FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        feed: action.payload,
        isFetchingPosts: false
      });

    case types.ADD_POST_SUCCESS:
      return Object.assign({}, state, {
        feed: [...state.feed, action.payload],
        isAddingPost: false
      });

    default:
      return state;
  }
}