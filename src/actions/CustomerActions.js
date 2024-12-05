import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  FILTER_CUSTOMER_FAIL,
  FILTER_CUSTOMER_REQUEST,
  FILTER_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMERS_FAIL,
  GET_ALL_CUSTOMERS_REQUESTS,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_L0_CUSTOMER_FAIL,
  GET_L0_CUSTOMER_REQUEST,
  GET_L0_CUSTOMER_SUCCESS,
  GET_L1_CUSTOMER_FAIL,
  GET_L1_CUSTOMER_REQUEST,
  GET_L1_CUSTOMER_SUCCESS,
  GET_L2_CUSTOMER_FAIL,
  GET_L2_CUSTOMER_REQUEST,
  GET_L2_CUSTOMER_SUCCESS,
  GET_L3_CUSTOMER_FAIL,
  GET_L3_CUSTOMER_REQUEST,
  GET_L3_CUSTOMER_SUCCESS,
  SEARCH_CUSTOMER_FAIL,
  SEARCH_CUSTOMER_REQUEST,
  SEARCH_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
} from '../constants/CustomerConstants'

// create new Customer
export const createCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/user/register`, payload)
    dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CUSTOMER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Customers
export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CUSTOMERS_REQUESTS })
    const { data } = await managementAxiosInstance.get(`/user/all`)
    dispatch({ type: GET_ALL_CUSTOMERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_CUSTOMERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Customer
export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/${id}/get`)
    dispatch({ type: GET_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Customer
export const updateCustomer = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/user/${id}/update`, payload)
    dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Customer
export const filterCustomer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get  L0Customer
export const getL0Customer = () => async (dispatch) => {
  try {
    dispatch({ type: GET_L0_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/tenancy_level?tenancy_level=L0`)
    dispatch({ type: GET_L0_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_L0_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get L1 Customer
export const getL1Customer = () => async (dispatch) => {
  try {
    dispatch({ type: GET_L1_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/tenancy_level?tenancy_level=L1`)
    dispatch({ type: GET_L1_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_L1_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get L2 Customer
export const getL2Customer = () => async (dispatch) => {
  try {
    dispatch({ type: GET_L2_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/tenancy_level?tenancy_level=L2`)
    dispatch({ type: GET_L2_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_L2_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get L3 Customer
export const getL3Customer = () => async (dispatch) => {
  try {
    dispatch({ type: GET_L3_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/tenancy_level?tenancy_level=L3`)
    dispatch({ type: GET_L3_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_L3_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Customer
export const searchCustomer = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/user/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_CUSTOMER_FAIL,
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
