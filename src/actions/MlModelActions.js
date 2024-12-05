import { mlModelAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  GET_ML_MODEL_FAIL,
  GET_ML_MODEL_REQUEST,
  GET_ML_MODEL_SUCCESS,
  UPDATE_ML_MODEL_FAIL,
  UPDATE_ML_MODEL_REQUEST,
  UPDATE_ML_MODEL_SUCCESS,
} from '../constants/MlModelConstants'

// get Ml Model
export const getMlModel = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ML_MODEL_REQUEST })
    const { data } = await mlModelAxiosInstance.get(`/ml_model/${id}/get`)
    dispatch({ type: GET_ML_MODEL_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ML_MODEL_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update ML Model
export const updateMlModel = (feed_id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ML_MODEL_REQUEST })
    const { data } = await mlModelAxiosInstance.put(`/ml_model/${feed_id}/update`, payload)
    dispatch({ type: UPDATE_ML_MODEL_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_ML_MODEL_FAIL,
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
