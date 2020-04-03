import { connect } from 'react-redux'
import { fetchAllIdeas, setSortDirection } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  disabled: ownProps.sortDirection === state.sortDirection
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setSortDirection(ownProps.sortDirection))
    dispatch(fetchAllIdeas())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
