import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_O365_CUSTOMER_FAIL,
  FILTER_O365_CUSTOMER_REQUEST,
  FILTER_O365_CUSTOMER_SUCCESS,
  GET_ALL_O365_CUSTOMERS_FAIL,
  GET_ALL_O365_CUSTOMERS_REQUESTS,
  GET_ALL_O365_CUSTOMERS_SUCCESS,
  GET_O365_CUSTOMER_FAIL,
  GET_O365_CUSTOMER_REQUEST,
  GET_O365_CUSTOMER_SUCCESS,
  O365_CUSTOMER_CREATE_FAIL,
  O365_CUSTOMER_CREATE_REQUEST,
  O365_CUSTOMER_CREATE_SUCCESS,
  SEARCH_O365_CUSTOMER_FAIL,
  SEARCH_O365_CUSTOMER_REQUEST,
  SEARCH_O365_CUSTOMER_SUCCESS,
  UPDATE_O365_CUSTOMER_FAIL,
  UPDATE_O365_CUSTOMER_REQUEST,
  UPDATE_O365_CUSTOMER_SUCCESS,
} from '../constants/O365CustomerConstants'

// create new O365 Customer
export const createO365Customer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: O365_CUSTOMER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/O365_customer/new`, payload)
    dispatch({ type: O365_CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: O365_CUSTOMER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All O365 Customers
export const getAllO365Customers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_O365_CUSTOMERS_REQUESTS })
    const { data } = await managementAxiosInstance.get(`/O365_customer/all`)
    dispatch({ type: GET_ALL_O365_CUSTOMERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_O365_CUSTOMERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get O365 Customer
export const getO365Customer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_O365_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/O365_customer/${id}/get`)
    dispatch({ type: GET_O365_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_O365_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update O365 Customer
export const updateO365Customer = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_O365_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/O365_customer/${id}/update`, payload)
    dispatch({ type: UPDATE_O365_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_O365_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter O365 Customer
export const filterO365Customer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_O365_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/O365_customer/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_O365_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_O365_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search O365 Customer
export const searchO365Customer = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_O365_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/O365_customer/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_O365_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_O365_CUSTOMER_FAIL,
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
