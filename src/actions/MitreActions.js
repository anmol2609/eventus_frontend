import { tiAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  GET_ALL_MITRE_FAIL,
  GET_ALL_MITRE_REQUESTS,
  GET_ALL_MITRE_SUCCESS,
} from '../constants/MitreConstants'

// get All Mitre
export const getAllMitre = (feed_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_MITRE_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/mitre/${feed_id}/all`)
    dispatch({ type: GET_ALL_MITRE_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_MITRE_FAIL,
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
