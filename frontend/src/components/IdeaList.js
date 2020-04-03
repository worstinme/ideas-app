import React from 'react'
import { connect } from 'react-redux'
import Idea from '../components/Idea'
import { deleteIdea, editIdea, selectIdea } from '../actions'

function IdeaList ({ ideas, onDelete, onEdit, onSelectIdea }) {
  if (!ideas.length) {
    return (
      <div>
        No Ideas
      </div>
    )
  }
  return (
    <div>
      {ideas.map(idea => {
        return (
          <Idea idea={idea} onDelete={onDelete}  onEdit={onEdit} onSelectIdea={onSelectIdea} key={idea.id}/>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ideas: state.ideas
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteIdea(id))
      return
    },
    onEdit: (id, data) => {
      dispatch(editIdea(id, data))
      return
    },
    onSelectIdea: (id) => {
      dispatch(selectIdea(id))
      return
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeaList)
