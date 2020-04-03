import React from 'react'
import SortLink from '../containers/SortLink'
import StatusLink from '../containers/StatusLink'
import SortDirections from '../constants/SortDirections'
import StatusFilters from '../constants/StatusFilters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

const Nav = () => (
  <div className="nav">
    <div className="filters">
      <span>Показать: </span>
      <StatusLink statusFilter={StatusFilters.STATUS_ALL}>
        Все
      </StatusLink>
      <StatusLink statusFilter={StatusFilters.STATUS_NEW}>
        Новые
      </StatusLink>
      <StatusLink statusFilter={StatusFilters.STATUS_IN_PROGRESS}>
        В процессе
      </StatusLink>
      <StatusLink statusFilter={StatusFilters.STATUS_COMPLETED}>
        Завершенные
      </StatusLink>
      <StatusLink statusFilter={StatusFilters.STATUS_REJECTED}>
        Отмененные
      </StatusLink>
    </div>
    <div className="sort">
      <span>Сортировать: </span>
      <SortLink sortDirection={SortDirections.DEFAULT}>
        Новые сверху
      </SortLink>
      <SortLink sortDirection={SortDirections.RATING_DESC}>
        По рейтингу <FontAwesomeIcon icon={faSortDown}/>
      </SortLink>
      <SortLink sortDirection={SortDirections.RATING_ASC}>
        По рейтингу <FontAwesomeIcon icon={faSortUp}/>
      </SortLink>
    </div>
  </div>
)

export default Nav
