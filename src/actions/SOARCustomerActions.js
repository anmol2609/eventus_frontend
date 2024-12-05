import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_SOAR_CUSTOMER_FAIL,
  FILTER_SOAR_CUSTOMER_REQUEST,
  FILTER_SOAR_CUSTOMER_SUCCESS,
  GET_ALL_SOAR_CUSTOMERS_FAIL,
  GET_ALL_SOAR_CUSTOMERS_REQUESTS,
  GET_ALL_SOAR_CUSTOMERS_SUCCESS,
  GET_SOAR_CUSTOMER_FAIL,
  GET_SOAR_CUSTOMER_REQUEST,
  GET_SOAR_CUSTOMER_SUCCESS,
  SEARCH_SOAR_CUSTOMER_FAIL,
  SEARCH_SOAR_CUSTOMER_REQUEST,
  SEARCH_SOAR_CUSTOMER_SUCCESS,
  SOAR_CUSTOMER_CREATE_FAIL,
  SOAR_CUSTOMER_CREATE_REQUEST,
  SOAR_CUSTOMER_CREATE_SUCCESS,
  UPDATE_SOAR_CUSTOMER_FAIL,
  UPDATE_SOAR_CUSTOMER_REQUEST,
  UPDATE_SOAR_CUSTOMER_SUCCESS,
} from '../constants/SOARCustomerConstants'

// create new SOAR Customer
export const createSOARCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SOAR_CUSTOMER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/soar_customer/new`, payload)
    dispatch({ type: SOAR_CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SOAR_CUSTOMER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All SOAR Customers
export const getAllSOARCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SOAR_CUSTOMERS_REQUESTS })
    const { data } = await managementAxiosInstance.get(`/soar_customer/all`)
    dispatch({ type: GET_ALL_SOAR_CUSTOMERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_SOAR_CUSTOMERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get SOAR Customer
export const getSOARCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SOAR_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/soar_customer/${id}/get`)
    dispatch({ type: GET_SOAR_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_SOAR_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update SOAR Customer
export const updateSOARCustomer = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SOAR_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/soar_customer/${id}/update`, payload)
    dispatch({ type: UPDATE_SOAR_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_SOAR_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter SOAR Customer
export const filterSOARCustomer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_SOAR_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/soar_customer/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_SOAR_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_SOAR_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search SOAR Customer
export const searchSOARCustomer = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_SOAR_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/soar_customer/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_SOAR_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_SOAR_CUSTOMER_FAIL,
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
