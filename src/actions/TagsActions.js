import { tiAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  GET_ALL_TAGS_FAIL,
  GET_ALL_TAGS_REQUESTS,
  GET_ALL_TAGS_SUCCESS,
} from '../constants/TagsConstants'

// get All Tags
export const getAllTags = (feed_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TAGS_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/tags/${feed_id}/all`)
    dispatch({ type: GET_ALL_TAGS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_TAGS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Used to clear all the errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
