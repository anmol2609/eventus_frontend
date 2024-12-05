import { managementAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FILTER_SOAR_PRODUCT_FAIL,
  FILTER_SOAR_PRODUCT_REQUEST,
  FILTER_SOAR_PRODUCT_SUCCESS,
  GET_ALL_SOAR_PRODUCTS_FAIL,
  GET_ALL_SOAR_PRODUCTS_REQUESTS,
  GET_ALL_SOAR_PRODUCTS_SUCCESS,
  GET_SOAR_PRODUCT_FAIL,
  GET_SOAR_PRODUCT_REQUEST,
  GET_SOAR_PRODUCT_SUCCESS,
  SEARCH_SOAR_PRODUCT_FAIL,
  SEARCH_SOAR_PRODUCT_REQUEST,
  SEARCH_SOAR_PRODUCT_SUCCESS,
  SOAR_PRODUCT_CREATE_FAIL,
  SOAR_PRODUCT_CREATE_REQUEST,
  SOAR_PRODUCT_CREATE_SUCCESS,
  UPDATE_SOAR_PRODUCT_FAIL,
  UPDATE_SOAR_PRODUCT_REQUEST,
  UPDATE_SOAR_PRODUCT_SUCCESS,
} from '../constants/SOARProductConstants'

// create new SOAR Product
export const createSOARProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SOAR_PRODUCT_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/soar_product/new`, payload)
    dispatch({ type: SOAR_PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SOAR_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All SOAR Products
export const getAllSOARProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SOAR_PRODUCTS_REQUESTS })
    const { data } = await managementAxiosInstance.get(`/soar_product/all`)
    dispatch({ type: GET_ALL_SOAR_PRODUCTS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_SOAR_PRODUCTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get SOAR Product
export const getSOARProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SOAR_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/soar_product/${id}/get`)
    dispatch({ type: GET_SOAR_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_SOAR_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update SOAR Product
export const updateSOARProduct = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SOAR_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.put(`/soar_product/${id}/update`, payload)
    dispatch({ type: UPDATE_SOAR_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_SOAR_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter SOAR Product
export const filterSOARProduct = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_SOAR_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/soar_product/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_SOAR_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_SOAR_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search SOAR Product
export const searchSOARProduct = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_SOAR_PRODUCT_REQUEST })
    const { data } = await managementAxiosInstance.get(`/soar_product/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_SOAR_PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_SOAR_PRODUCT_FAIL,
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
