import {
  FETCH_IDEA,
  SET_SORT_DIRECTION,
  SET_STATUS_FILTER,
  SET_NEXT_PAGINATION_VISIBILITY,
  SET_PREV_PAGINATION_VISIBILITY,
  SET_PAGINATION_HELD,
  EDIT_IDEA,
  SELECT_IDEA,
  DELETE_IDEA
} from './types'
import SortDirections from '../constants/SortDirections'
import axios from 'axios'

const apiUrl = window.location.origin + ':4000/ideas'
const pageSizeLimit = 50

export const createIdea = ({ title, rating, status }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}`, { title, rating, status }).then(response => {
      dispatch(fetchAllIdeas())
    }).catch(error => {
      throw(error)
    })
  }
}

export const deleteIdeaSuccess = (id) => ({ type: DELETE_IDEA, id })

export const deleteIdea = id => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/${id}`).then(response => {
      dispatch(deleteIdeaSuccess(id))
    }).catch(error => {
      throw(error)
    })
  }
}

export const editIdea = (id, data) => {
  return (dispatch) => {
    return axios.put(`${apiUrl}/${id}`, data).then(response => {
      dispatch(updateEditSuccess(id, response.data))
    }).catch(error => {
      throw(error)
    })
  }
}

export const updateStatusIdeas = (ideas, status) => {
  return (dispatch) => {
    Promise.all(ideas.map(idea => {
      return axios.put(`${apiUrl}/${idea.id}`, { status }).then(response => {
        return Promise.resolve({
          id: idea.id,
          result: 'updated',
          data: response.data
        })
      }).catch(() => {
        return Promise.resolve({
          id: idea.id,
          result: 'rejected'
        })
      })
    })).then(values => {
      values.forEach((value) => {
        if (value.result === 'updated') {
          dispatch(updateEditSuccess(value.id, value.data))
        }
        dispatch(selectIdea(value.id))
      })
    })
  }
}

export const selectIdea = id => ({ type: SELECT_IDEA, id })
export const updateEditSuccess = (id, data) => ({ type: EDIT_IDEA, id, data })

export const fetchIdeas = (ideas) => {
  return {
    type: FETCH_IDEA,
    ideas
  }
}

export const fetchAllIdeas = () => {
  return (dispatch, getState) => {
    dispatch(setPaginationHeld(true))
    const state = getState()
    const params = {
      sort: state.sortDirection,
      status: state.statusFilter,
      limit: pageSizeLimit + 1
    }
    return axios.get(apiUrl, {
      params
    }).then(response => {
      dispatch(setPaginationHeld(false))
      dispatch(
        setNextPaginationVisibility(response.data.length > pageSizeLimit))
      dispatch(setPrevPaginationVisibility(false))
      dispatch(fetchIdeas(response.data.slice(0, pageSizeLimit)))
    }).catch(error => {
      dispatch(setPaginationHeld(false))
      throw(error)
    })
  }
}

export const fetchPaginatedIdeas = (reverse = false) => {
  return (dispatch, getState) => {
    const state = getState()
    const params = {
      sort: state.sortDirection,
      status: state.statusFilter,
      seek: reverse ? 'prev' : 'next',
      limit: pageSizeLimit + 1
    }
    const idea = reverse ? state.ideas.shift() : state.ideas.pop()
    if (idea) {
      params.seek_id = idea.id
      if (params.sort === SortDirections.RATING_DESC || params.sort ===
        SortDirections.RATING_ASC) {
        params.seek_rating = idea.rating
      }
    }
    dispatch(setPaginationHeld(true))
    return axios.get(apiUrl, {
      params
    }).then(response => {
      dispatch(setPaginationHeld(false))
      const overLimit = response.data.length > pageSizeLimit
      let data = response.data.slice(0, pageSizeLimit)
      if (reverse) {
        data.reverse()
        dispatch(setPrevPaginationVisibility(overLimit))
      } else {
        dispatch(setNextPaginationVisibility(overLimit))
      }
      dispatch(fetchIdeas(data))
    }).catch(error => {
      dispatch(setPaginationHeld(false))
      throw(error)
    })
  }
}

export const setPaginationHeld = isHeld => ({
  type: SET_PAGINATION_HELD,
  isHeld
})

export const setNextPaginationVisibility = visible => ({
  type: SET_NEXT_PAGINATION_VISIBILITY,
  visible
})

export const setPrevPaginationVisibility = visible => ({
  type: SET_PREV_PAGINATION_VISIBILITY,
  visible
})

export const setSortDirection = sortDirection => ({
  type: SET_SORT_DIRECTION,
  sortDirection
})

export const setStatusFilter = statusFilter => ({
  type: SET_STATUS_FILTER,
  statusFilter
})
