import { connect } from 'react-redux'
import { fetchAllIdeas, setStatusFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  disabled: ownProps.statusFilter === state.statusFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setStatusFilter(ownProps.statusFilter))
    dispatch(fetchAllIdeas())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
