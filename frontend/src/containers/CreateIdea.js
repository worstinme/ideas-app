import { connect } from 'react-redux';
import { createIdea } from '../actions';
import NewIdea from '../components/NewIdea';

const mapDispatchToProps = dispatch => {
  return {
    onAddIdea: idea => {
      dispatch(createIdea(idea));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewIdea);
