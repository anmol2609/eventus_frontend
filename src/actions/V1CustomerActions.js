import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_V1_CUSTOMER_FAIL,
  FILTER_V1_CUSTOMER_REQUEST,
  FILTER_V1_CUSTOMER_SUCCESS,
  GET_ALL_V1_CUSTOMERS_FAIL,
  GET_ALL_V1_CUSTOMERS_REQUESTS,
  GET_ALL_V1_CUSTOMERS_SUCCESS,
  GET_V1_CUSTOMER_FAIL,
  GET_V1_CUSTOMER_REQUEST,
  GET_V1_CUSTOMER_SUCCESS,
  SEARCH_V1_CUSTOMER_FAIL,
  SEARCH_V1_CUSTOMER_REQUEST,
  SEARCH_V1_CUSTOMER_SUCCESS,
  UPDATE_V1_CUSTOMER_FAIL,
  UPDATE_V1_CUSTOMER_REQUEST,
  UPDATE_V1_CUSTOMER_SUCCESS,
  V1_CUSTOMER_CREATE_FAIL,
  V1_CUSTOMER_CREATE_REQUEST,
  V1_CUSTOMER_CREATE_SUCCESS,
} from '../constants/V1CustomerConstants'

// create new V1 Customer
export const createV1Customer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: V1_CUSTOMER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/v1_customer/new`, payload)
    dispatch({ type: V1_CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: V1_CUSTOMER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All V1 Customers
export const getAllV1Customers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_V1_CUSTOMERS_REQUESTS })
    const { data } = await managementAxiosInstance.get(`/v1_customer/all`)
    dispatch({ type: GET_ALL_V1_CUSTOMERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_V1_CUSTOMERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get V1 Customer
export const getV1Customer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_V1_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer/${id}/get`)
    dispatch({ type: GET_V1_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_V1_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update V1 Customer
export const updateV1Customer = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_V1_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/v1_customer/${id}/update`, payload)
    dispatch({ type: UPDATE_V1_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_V1_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter V1 Customer
export const filterV1Customer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_V1_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_V1_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_V1_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search V1 Customer
export const searchV1Customer = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_V1_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_V1_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_V1_CUSTOMER_FAIL,
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
