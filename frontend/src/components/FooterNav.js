import React from 'react'
import { connect } from 'react-redux'
import { updateStatusIdeas } from '../actions'

function FooterNav ({ selectedIdeas, handleClick }) {
  return (
    <div className="footer-nav"
         style={{
           bottom: selectedIdeas.length ? 0 : '-60px'
         }}>
      <div className="container">
        <div className="filters">
          <span>Перенести в: </span>
          <button onClick={() => handleClick(selectedIdeas, 0)}>
            Новые
          </button>
          <button onClick={() => handleClick(selectedIdeas, 1)}>
            В процессе
          </button>
          <button onClick={() => handleClick(selectedIdeas, 2)}>
            Завершенные
          </button>
          <button onClick={() => handleClick(selectedIdeas, -1)}>
            Отмененные
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedIdeas: state.ideas.filter(idea => idea.selected)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (ideas, status) => {
      dispatch(updateStatusIdeas(ideas, status))
      return
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterNav)
