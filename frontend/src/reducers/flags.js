import { NETWORK_STATUS_CHANGE } from './../actions/types';

const defaultState = {
  networkStatus: undefined,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NETWORK_STATUS_CHANGE:
      return Object.assign({}, state, {
        networkStatus: action.payload
      });
    default:
      return state;
  }
}