import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  DATA_CENTER_CREATE_FAIL,
  DATA_CENTER_CREATE_REQUEST,
  DATA_CENTER_CREATE_SUCCESS,
  FILTER_DATA_CENTER_FAIL,
  FILTER_DATA_CENTER_REQUEST,
  FILTER_DATA_CENTER_SUCCESS,
  GET_ALL_DATA_CENTERS_FAIL,
  GET_ALL_DATA_CENTERS_REQUEST,
  GET_ALL_DATA_CENTERS_SUCCESS,
  GET_DATA_CENTER_FAIL,
  GET_DATA_CENTER_REQUEST,
  GET_DATA_CENTER_SUCCESS,
  SEARCH_DATA_CENTER_FAIL,
  SEARCH_DATA_CENTER_REQUEST,
  SEARCH_DATA_CENTER_SUCCESS,
  UPDATE_DATA_CENTER_FAIL,
  UPDATE_DATA_CENTER_REQUEST,
  UPDATE_DATA_CENTER_SUCCESS,
} from '../constants/DataCenterConstants'

// create new Data Center
export const createDataCenter = (payload) => async (dispatch) => {
  try {
    dispatch({ type: DATA_CENTER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/data_center/new`, payload)
    dispatch({ type: DATA_CENTER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DATA_CENTER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Data Centers
export const getAllDataCenters = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DATA_CENTERS_REQUEST })
    const { data } = await managementAxiosInstance.get(`/data_center/all`)
    dispatch({ type: GET_ALL_DATA_CENTERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_DATA_CENTERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Data Center
export const getDataCenter = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DATA_CENTER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/data_center/${id}/get`)
    dispatch({ type: GET_DATA_CENTER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_DATA_CENTER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Data Center
export const updateDataCenter = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DATA_CENTER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/data_center/${id}/update`, payload)
    dispatch({ type: UPDATE_DATA_CENTER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_DATA_CENTER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Data Center
export const filterDataCenter = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_DATA_CENTER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/data_center/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_DATA_CENTER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_DATA_CENTER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Data Center
export const searchDataCenter = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_DATA_CENTER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/data_center/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_DATA_CENTER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_DATA_CENTER_FAIL,
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
