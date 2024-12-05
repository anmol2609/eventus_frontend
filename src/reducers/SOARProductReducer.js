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

export const createSOARProductReducer = (state = { SOAR_product: {} }, action) => {
  switch (action.type) {
    case SOAR_PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case SOAR_PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        SOAR_product: action.payload,
      }
    case SOAR_PRODUCT_CREATE_FAIL:
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

export const GetAllSOARProductsReducer = (state = { SOAR_products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_SOAR_PRODUCTS_REQUESTS:
    case FILTER_SOAR_PRODUCT_REQUEST:
    case SEARCH_SOAR_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_SOAR_PRODUCTS_SUCCESS:
    case FILTER_SOAR_PRODUCT_SUCCESS:
    case SEARCH_SOAR_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        SOAR_products: action.payload,
      }
    case GET_ALL_SOAR_PRODUCTS_FAIL:
    case FILTER_SOAR_PRODUCT_FAIL:
    case SEARCH_SOAR_PRODUCT_FAIL:
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

export const getSOARProductReducer = (state = { SOAR_product: null }, action) => {
  switch (action.type) {
    case GET_SOAR_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case GET_SOAR_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        SOAR_product: action.payload,
      }
    case GET_SOAR_PRODUCT_FAIL:
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

export const updateSOARProductReducer = (state = { SOAR_product: {} }, action) => {
  switch (action.type) {
    case UPDATE_SOAR_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_SOAR_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        SOAR_product: action.payload,
      }
    case UPDATE_SOAR_PRODUCT_FAIL:
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
