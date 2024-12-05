import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_LOGGER_CUSTOMER_FAIL,
  FILTER_LOGGER_CUSTOMER_REQUEST,
  FILTER_LOGGER_CUSTOMER_SUCCESS,
  FILTER_LOGGER_PRODUCT_FAIL,
  FILTER_LOGGER_PRODUCT_REQUEST,
  FILTER_LOGGER_PRODUCT_SUCCESS,
  GET_ALL_LOGGER_CUSTOMERS_FAIL,
  GET_ALL_LOGGER_CUSTOMERS_REQUEST,
  GET_ALL_LOGGER_CUSTOMERS_SUCCESS,
  GET_ALL_LOGGER_PRODUCTS_FAIL,
  GET_ALL_LOGGER_PRODUCTS_REQUEST,
  GET_ALL_LOGGER_PRODUCTS_SUCCESS,
  GET_LOGGER_CUSTOMER_FAIL,
  GET_LOGGER_CUSTOMER_REQUEST,
  GET_LOGGER_CUSTOMER_SUCCESS,
  GET_LOGGER_PRODUCT_FAIL,
  GET_LOGGER_PRODUCT_REQUEST,
  GET_LOGGER_PRODUCT_SUCCESS,
  LOGGER_CUSTOMER_CREATE_FAIL,
  LOGGER_CUSTOMER_CREATE_REQUEST,
  LOGGER_CUSTOMER_CREATE_SUCCESS,
  LOGGER_PRODUCT_CREATE_FAIL,
  LOGGER_PRODUCT_CREATE_REQUEST,
  LOGGER_PRODUCT_CREATE_SUCCESS,
  SEARCH_LOGGER_CUSTOMER_FAIL,
  SEARCH_LOGGER_CUSTOMER_REQUEST,
  SEARCH_LOGGER_CUSTOMER_SUCCESS,
  SEARCH_LOGGER_PRODUCT_FAIL,
  SEARCH_LOGGER_PRODUCT_REQUEST,
  SEARCH_LOGGER_PRODUCT_SUCCESS,
  UPDATE_LOGGER_CUSTOMER_FAIL,
  UPDATE_LOGGER_CUSTOMER_REQUEST,
  UPDATE_LOGGER_CUSTOMER_SUCCESS,
  UPDATE_LOGGER_PRODUCT_FAIL,
  UPDATE_LOGGER_PRODUCT_REQUEST,
  UPDATE_LOGGER_PRODUCT_SUCCESS,
} from '../constants/LoggerConstants'

// create new Logger Customer
export const createLoggerCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOGGER_CUSTOMER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/logger_customer/new`, payload)
    dispatch({ type: LOGGER_CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOGGER_CUSTOMER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Logger Customers
export const getAllLoggerCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LOGGER_CUSTOMERS_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_customer/all`)
    dispatch({ type: GET_ALL_LOGGER_CUSTOMERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_LOGGER_CUSTOMERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Logger Customer
export const getLoggerCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LOGGER_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_customer/${id}/get`)
    dispatch({ type: GET_LOGGER_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_LOGGER_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Logger Customer
export const updateLoggerCustomer = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LOGGER_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/logger_customer/${id}/update`, payload)
    dispatch({ type: UPDATE_LOGGER_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_LOGGER_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Logger Product
export const filterLoggerCustomer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_LOGGER_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_customer/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_LOGGER_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_LOGGER_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Logger Customer
export const searchLoggerCustomer = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_LOGGER_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_customer/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_LOGGER_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_LOGGER_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// create new Logger Product
export const createLoggerProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOGGER_PRODUCT_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/logger_product/new`, payload)
    dispatch({ type: LOGGER_PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOGGER_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Logger Product
export const getAllLoggerProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LOGGER_PRODUCTS_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_product/all`)
    dispatch({ type: GET_ALL_LOGGER_PRODUCTS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_LOGGER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Logger Product
export const getLoggerProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LOGGER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_product/${id}/get`)
    dispatch({ type: GET_LOGGER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_LOGGER_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Logger Product
export const updateLoggerProduct = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LOGGER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.put(`/logger_product/${id}/update`, payload)
    dispatch({ type: UPDATE_LOGGER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_LOGGER_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Logger Product
export const filterLoggerProduct = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_LOGGER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_product/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_LOGGER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_LOGGER_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Logger Product
export const searchLoggerProduct = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_LOGGER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/logger_product/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_LOGGER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_LOGGER_PRODUCT_FAIL,
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
