import { SET_PREV_PAGINATION_VISIBILITY } from './../actions/types'

const prevPaginationVisible = (state = false, action) => {
  switch (action.type) {
    case SET_PREV_PAGINATION_VISIBILITY:
      return action.visible
    default:
      return state
  }
}
export default prevPaginationVisible
