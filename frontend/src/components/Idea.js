import React, { Component } from 'react'
import {
  faCheck,
  faThumbsDown,
  faThumbsUp,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusFilters from '../constants/StatusFilters'
import StatusLabel from './StatusLabel'
import IdeaTextInput from './IdeaTextInput'
import PropTypes from 'prop-types'

export default class Idea extends Component {
  static propTypes = {
    idea: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, title) => {
    if (title.length === 0) {
      this.props.onDelete(id)
    } else {
      this.props.onEdit(id, { title })
    }
    this.setState({ editing: false })
  }

  handleRatingUpdate = (id, rating) => {
    this.props.onEdit(id, { rating })
  }

  render () {
    const { idea, onDelete, onSelectIdea } = this.props
    let element
    if (this.state.editing) {
      element = (<IdeaTextInput text={idea.title}
                                editing={this.state.editing}
                                onSave={(text) => this.handleSave(idea.id,
                                  text)}/>
      )
    } else {
      element = (
        <div className="title">
          <div className="right">
            <span className="status">
              {(function () {
                switch (idea.status) {
                  case StatusFilters.STATUS_NEW:
                    return <StatusLabel title="Новая"/>
                  case StatusFilters.STATUS_IN_PROGRESS:
                    return <StatusLabel title="В процессе"/>
                  case StatusFilters.STATUS_REJECTED:
                    return <StatusLabel title="Отклонена"/>
                  case StatusFilters.STATUS_COMPLETED:
                    return <StatusLabel title="Завершена"/>
                  default:
                    return null
                }
              })()}
            </span>
            <span className="rating">
              <FontAwesomeIcon onClick={() => this.handleRatingUpdate(idea.id,
                idea.rating - 1)} icon={faThumbsDown}/>
              <span className={idea.rating >= 0
                ? 'positive'
                : 'negative'}>{idea.rating > 0
                ? '+' + idea.rating
                : idea.rating}</span>
              <FontAwesomeIcon onClick={() => this.handleRatingUpdate(idea.id,
                idea.rating + 1)} icon={faThumbsUp}/>
            </span>
          </div>
          <div className="left" onDoubleClick={this.handleDoubleClick}>
            <span className="title">
              {idea.title}
            </span>
            <span className="id">
               #{idea.id}
            </span>
          </div>
          <div className="select" onClick={() => onSelectIdea(idea.id)}>
            <div className="round">
              { idea.selected ? <FontAwesomeIcon icon={faCheck}/> : '' }
            </div>
          </div>
          <button className="remove" type="button"
                  onClick={() => onDelete(idea.id)}>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </div>
      )
    }

    return (
      <div className="idea-item">
        {element}
      </div>
    )

  }

}
