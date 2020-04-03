const statusFilter = (state = null, action) => {
  switch (action.type) {
    case 'SET_STATUS_FILTER':
      return action.statusFilter
    default:
      return state
  }
}

export default statusFilter
