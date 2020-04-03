import React from 'react'
import StatusFilters from '../constants/StatusFilters'

class NewIdea extends React.Component {
  state = {
    title: '',
    rating: 0,
    status: StatusFilters.STATUS_NEW
  }

  handleSubmit = e => {
    if (e.which === 13) {
      this.setState({
        title: e.target.value.trim()
      })
      this.props.onAddIdea(this.state)
      this.handleReset()
    }
  }

  handleChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  handleReset = () => {
    this.setState({
      title: ''
    })
  }

  render () {
    return (
      <div className="new-idea-form">
        <input
          type="text"
          placeholder="Есть идея? Напиши"
          className="form-input"
          name="title"
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          value={this.state.title}
        />
      </div>
    )
  }
}

export default NewIdea
