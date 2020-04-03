import { combineReducers } from 'redux'
import ideas from './ideasReducer'
import sortDirection from './sortDirection'
import statusFilter from './statusFilter'
import nextPaginationVisible from './nextPaginationVisible'
import prevPaginationVisible from './prevPaginationVisible'
import paginationHeld from './paginationHeld'

export default combineReducers({
  ideas: ideas,
  sortDirection: sortDirection,
  statusFilter: statusFilter,
  nextPaginationVisible: nextPaginationVisible,
  prevPaginationVisible: prevPaginationVisible,
  paginationHeld: paginationHeld
})
