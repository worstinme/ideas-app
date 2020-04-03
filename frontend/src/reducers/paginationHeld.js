import { SET_PAGINATION_HELD } from './../actions/types'

const paginationHeld = (state = false, action) => {
  switch (action.type) {
    case SET_PAGINATION_HELD:
      return action.isHeld
    default:
      return state
  }
}
export default paginationHeld
