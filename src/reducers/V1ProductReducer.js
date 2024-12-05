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

export const createV1ProductReducer = (state = { V1_product: {} }, action) => {
  switch (action.type) {
    case V1_PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case V1_PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        V1_product: action.payload,
      }
    case V1_PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
      }
    default:
      return state
  }
}

export const GetAllV1ProductsReducer = (state = { V1_products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_V1_PRODUCTS_REQUESTS:
    case FILTER_V1_PRODUCT_REQUEST:
    case SEARCH_V1_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_V1_PRODUCTS_SUCCESS:
    case FILTER_V1_PRODUCT_SUCCESS:
    case SEARCH_V1_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        V1_products: action.payload,
      }
    case GET_ALL_V1_PRODUCTS_FAIL:
    case FILTER_V1_PRODUCT_FAIL:
    case SEARCH_V1_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const getV1ProductReducer = (state = { V1_product: null }, action) => {
  switch (action.type) {
    case GET_V1_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case GET_V1_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        V1_product: action.payload,
      }
    case GET_V1_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
      }
    default:
      return state
  }
}

export const updateV1ProductReducer = (state = { V1_product: {} }, action) => {
  switch (action.type) {
    case UPDATE_V1_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_V1_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        V1_product: action.payload,
      }
    case UPDATE_V1_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        isUpdated: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        isUpdated: false,
        success: false,
      }
    default:
      return state
  }
}
