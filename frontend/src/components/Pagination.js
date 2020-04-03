import React from 'react'
import NextLink from '../containers/NextLink'
import PrevLink from '../containers/PrevLink'

const Pagination = () => (
  <div className="pagination">
    <PrevLink>Назад</PrevLink>
    <NextLink>Вперед</NextLink>
  </div>
)

export default Pagination
