import React from 'react'
import PropTypes from 'prop-types'

const StatusLabel = ({ title }) => (
    <span>
      { title }
    </span>
)

StatusLabel.propTypes = {
  title: PropTypes.string.isRequired
}

export default StatusLabel
