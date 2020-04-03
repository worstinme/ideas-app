const sortDirection = (state = '-id', action) => {
  switch (action.type) {
    case 'SET_SORT_DIRECTION':
      return action.sortDirection
    default:
      return state
  }
}

export default sortDirection
