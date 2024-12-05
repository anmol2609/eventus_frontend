import { managementAxiosInstance } from 'src/config/Axios'
import {
  AWS_CUSTOMER_CREATE_FAIL,
  AWS_CUSTOMER_CREATE_REQUEST,
  AWS_CUSTOMER_CREATE_SUCCESS,
  CLEAR_ERRORS,
  FILTER_AWS_CUSTOMER_FAIL,
  FILTER_AWS_CUSTOMER_REQUEST,
  FILTER_AWS_CUSTOMER_SUCCESS,
  GET_ALL_AWS_CUSTOMERS_FAIL,
  GET_ALL_AWS_CUSTOMERS_REQUEST,
  GET_ALL_AWS_CUSTOMERS_SUCCESS,
  GET_AWS_CUSTOMER_FAIL,
  GET_AWS_CUSTOMER_REQUEST,
  GET_AWS_CUSTOMER_SUCCESS,
  SEARCH_AWS_CUSTOMER_FAIL,
  SEARCH_AWS_CUSTOMER_REQUEST,
  SEARCH_AWS_CUSTOMER_SUCCESS,
  UPDATE_AWS_CUSTOMER_FAIL,
  UPDATE_AWS_CUSTOMER_REQUEST,
  UPDATE_AWS_CUSTOMER_SUCCESS,
} from '../constants/AWSCustomerConstants'

// create new AWS Customer
export const createAWSCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: AWS_CUSTOMER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/aws_customer/new`, payload)
    dispatch({ type: AWS_CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: AWS_CUSTOMER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All AWS Customers
export const getAllAWSCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_AWS_CUSTOMERS_REQUEST })
    const { data } = await managementAxiosInstance.get(`/aws_customer/all`)
    dispatch({ type: GET_ALL_AWS_CUSTOMERS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_AWS_CUSTOMERS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get AWS Customer
export const getAWSCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_AWS_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/aws_customer/${id}/get`)
    dispatch({ type: GET_AWS_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_AWS_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update AWS Customer
export const updateAWSCustomer = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AWS_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/aws_customer/${id}/update`, payload)
    dispatch({ type: UPDATE_AWS_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_AWS_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter AWS Customer
export const filterAWSCustomer = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_AWS_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/aws_customer/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_AWS_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_AWS_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search AWS Customer
export const searchAWSCustomer = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_AWS_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(`/aws_customer/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_AWS_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_AWS_CUSTOMER_FAIL,
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
