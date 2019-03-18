import { combineReducers } from 'redux'

import posts from './posts'
import flags from './flags'

export default combineReducers({
  posts,
  flags,
})