import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_V1_CUSTOMER_PRODUCT_FAIL,
  FILTER_V1_CUSTOMER_PRODUCT_REQUEST,
  FILTER_V1_CUSTOMER_PRODUCT_SUCCESS,
  GET_V1_CUSTOMER_PRODUCT_FAIL,
  GET_V1_CUSTOMER_PRODUCT_FOR_CUSTOMER_FAIL,
  GET_V1_CUSTOMER_PRODUCT_FOR_CUSTOMER_REQUEST,
  GET_V1_CUSTOMER_PRODUCT_FOR_CUSTOMER_SUCCESS,
  GET_V1_CUSTOMER_PRODUCT_REQUEST,
  GET_V1_CUSTOMER_PRODUCT_SUCCESS,
  SEARCH_V1_CUSTOMER_PRODUCT_FAIL,
  SEARCH_V1_CUSTOMER_PRODUCT_REQUEST,
  SEARCH_V1_CUSTOMER_PRODUCT_SUCCESS,
  UPDATE_V1_CUSTOMER_PRODUCT_FAIL,
  UPDATE_V1_CUSTOMER_PRODUCT_REQUEST,
  UPDATE_V1_CUSTOMER_PRODUCT_SUCCESS,
  V1_CUSTOMER_PRODUCT_CREATE_FAIL,
  V1_CUSTOMER_PRODUCT_CREATE_REQUEST,
  V1_CUSTOMER_PRODUCT_CREATE_SUCCESS,
  GET_ALL_V1_CUSTOMER_PRODUCTS_REQUEST,
  GET_ALL_V1_CUSTOMER_PRODUCTS_SUCCESS,
  GET_ALL_V1_CUSTOMER_PRODUCTS_FAIL,
} from '../constants/V1CustomerProductConstants'

// create new V1 Customer Product
export const createV1CustomerProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: V1_CUSTOMER_PRODUCT_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/v1_customer_product/new`, payload)
    dispatch({ type: V1_CUSTOMER_PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: V1_CUSTOMER_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get V1 Customer Product
export const getV1CustomerProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_V1_CUSTOMER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer_product/${id}/get`)
    dispatch({ type: GET_V1_CUSTOMER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_V1_CUSTOMER_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get V1 Customer Product for Customer
export const getV1CustomerProductForCustomer = (customer_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_V1_CUSTOMER_PRODUCT_FOR_CUSTOMER_REQUEST })
    const { data } = await managementAxiosInstance.get(
      `/v1_customer_product/${customer_id}/customer`,
    )
    dispatch({ type: GET_V1_CUSTOMER_PRODUCT_FOR_CUSTOMER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_V1_CUSTOMER_PRODUCT_FOR_CUSTOMER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All V1 Customer Product for Customer
export const getAllV1CustomerProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_V1_CUSTOMER_PRODUCTS_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer_product/all`)
    dispatch({ type: GET_ALL_V1_CUSTOMER_PRODUCTS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_V1_CUSTOMER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update V1 Customer Product
export const updateV1CustomerProduct = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_V1_CUSTOMER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.put(`/v1_customer_product/${id}/update`, payload)
    dispatch({ type: UPDATE_V1_CUSTOMER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_V1_CUSTOMER_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter V1 Customer Product
export const filterV1CustomerProduct = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_V1_CUSTOMER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer_product/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_V1_CUSTOMER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_V1_CUSTOMER_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search V1 Customer Product
export const searchV1CustomerProduct = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_V1_CUSTOMER_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_customer_product/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_V1_CUSTOMER_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_V1_CUSTOMER_PRODUCT_FAIL,
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
