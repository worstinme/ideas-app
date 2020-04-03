import { connect } from 'react-redux'
import {
  fetchPaginatedIdeas,
  setPrevPaginationVisibility
} from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  hidden: !state.nextPaginationVisible,
  disabled: state.paginationHeld
})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(fetchPaginatedIdeas())
    dispatch(setPrevPaginationVisibility(true))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
