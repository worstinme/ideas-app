import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ hidden, disabled, children, onClick }) => (
  <button
    href={'#'}
    onClick={onClick}
    disabled={disabled}
    className={hidden === true ? 'hidden' : null}
  >
    {children}
  </button>
)

Link.propTypes = {
  hidden: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
