import {
  FETCH_IDEA,
  EDIT_IDEA,
  SELECT_IDEA,
  DELETE_IDEA
} from '../actions/types'

export default function ideaReducer (state = [], action) {
  switch (action.type) {
    case FETCH_IDEA:
      return action.ideas
    case EDIT_IDEA:
      return state.map(idea =>
        idea.id === action.id ?
          { ...idea, ...action.data } :
          idea
      )
    case SELECT_IDEA:
      return state.map(idea => {
        return idea.id === action.id ?
          { ...idea, selected: !(idea.selected) } :
          idea
      })
    case DELETE_IDEA:
      return state.filter(idea =>
        idea.id !== action.id
      )

    default:
      return state
  }
}
