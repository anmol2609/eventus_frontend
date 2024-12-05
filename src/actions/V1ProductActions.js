import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_V1_PRODUCT_FAIL,
  FILTER_V1_PRODUCT_REQUEST,
  FILTER_V1_PRODUCT_SUCCESS,
  GET_ALL_V1_PRODUCTS_FAIL,
  GET_ALL_V1_PRODUCTS_REQUESTS,
  GET_ALL_V1_PRODUCTS_SUCCESS,
  GET_V1_PRODUCT_FAIL,
  GET_V1_PRODUCT_REQUEST,
  GET_V1_PRODUCT_SUCCESS,
  SEARCH_V1_PRODUCT_FAIL,
  SEARCH_V1_PRODUCT_REQUEST,
  SEARCH_V1_PRODUCT_SUCCESS,
  UPDATE_V1_PRODUCT_FAIL,
  UPDATE_V1_PRODUCT_REQUEST,
  UPDATE_V1_PRODUCT_SUCCESS,
  V1_PRODUCT_CREATE_FAIL,
  V1_PRODUCT_CREATE_REQUEST,
  V1_PRODUCT_CREATE_SUCCESS,
} from '../constants/V1ProductConstants'

// create new V1 Product
export const createV1Product = (payload) => async (dispatch) => {
  try {
    dispatch({ type: V1_PRODUCT_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/v1_product/new`, payload)
    dispatch({ type: V1_PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: V1_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All V1 Products
export const getAllV1Products = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_V1_PRODUCTS_REQUESTS })
    const { data } = await managementAxiosInstance.get(`/v1_product/all`)
    dispatch({ type: GET_ALL_V1_PRODUCTS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_V1_PRODUCTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get V1 Product
export const getV1Product = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_V1_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_product/${id}/get`)
    dispatch({ type: GET_V1_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_V1_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update V1 Product
export const updateV1Product = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_V1_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.put(`/v1_product/${id}/update`, payload)
    dispatch({ type: UPDATE_V1_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_V1_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter V1 Product
export const filterV1Product = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_V1_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_product/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_V1_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_V1_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search V1 Product
export const searchV1Product = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_V1_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/v1_product/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_V1_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_V1_PRODUCT_FAIL,
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
