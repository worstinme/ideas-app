import { connect } from 'react-redux'
import { fetchPaginatedIdeas } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  hidden: !state.prevPaginationVisible,
  disabled: state.paginationHeld
})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(fetchPaginatedIdeas(true))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
