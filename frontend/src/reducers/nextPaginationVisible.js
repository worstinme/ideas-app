import { SET_NEXT_PAGINATION_VISIBILITY } from './../actions/types'

const nextPaginationVisible = (state = false, action) => {
  switch (action.type) {
    case SET_NEXT_PAGINATION_VISIBILITY:
      return action.visible
    default:
      return state
  }
}
export default nextPaginationVisible
