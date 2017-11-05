import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import timer from './timerReducer'

const rootReducers = combineReducers({
  router: routerReducer,
  timer
})

export default rootReducers
