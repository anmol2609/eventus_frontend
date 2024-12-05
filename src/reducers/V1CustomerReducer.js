import {
  CLEAR_ERRORS,
  FILTER_V1_CUSTOMER_FAIL,
  FILTER_V1_CUSTOMER_REQUEST,
  FILTER_V1_CUSTOMER_SUCCESS,
  GET_ALL_V1_CUSTOMERS_FAIL,
  GET_ALL_V1_CUSTOMERS_REQUESTS,
  GET_ALL_V1_CUSTOMERS_SUCCESS,
  GET_V1_CUSTOMER_FAIL,
  GET_V1_CUSTOMER_REQUEST,
  GET_V1_CUSTOMER_SUCCESS,
  SEARCH_V1_CUSTOMER_FAIL,
  SEARCH_V1_CUSTOMER_REQUEST,
  SEARCH_V1_CUSTOMER_SUCCESS,
  UPDATE_V1_CUSTOMER_FAIL,
  UPDATE_V1_CUSTOMER_REQUEST,
  UPDATE_V1_CUSTOMER_SUCCESS,
  V1_CUSTOMER_CREATE_FAIL,
  V1_CUSTOMER_CREATE_REQUEST,
  V1_CUSTOMER_CREATE_SUCCESS,
} from '../constants/V1CustomerConstants'

export const createV1CustomerReducer = (state = { V1_customer: {} }, action) => {
  switch (action.type) {
    case V1_CUSTOMER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case V1_CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        V1_customer: action.payload,
      }
    case V1_CUSTOMER_CREATE_FAIL:
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

export const GetAllV1CustomersReducer = (state = { V1_customers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_V1_CUSTOMERS_REQUESTS:
    case FILTER_V1_CUSTOMER_REQUEST:
    case SEARCH_V1_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_V1_CUSTOMERS_SUCCESS:
    case FILTER_V1_CUSTOMER_SUCCESS:
    case SEARCH_V1_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        V1_customers: action.payload,
      }
    case GET_ALL_V1_CUSTOMERS_FAIL:
    case FILTER_V1_CUSTOMER_FAIL:
    case SEARCH_V1_CUSTOMER_FAIL:
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

export const getV1CustomerReducer = (state = { V1_customer: null }, action) => {
  switch (action.type) {
    case GET_V1_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_V1_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        V1_customer: action.payload,
      }
    case GET_V1_CUSTOMER_FAIL:
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

export const updateV1CustomerReducer = (state = { V1_customer: {} }, action) => {
  switch (action.type) {
    case UPDATE_V1_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_V1_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        V1_customer: action.payload,
      }
    case UPDATE_V1_CUSTOMER_FAIL:
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
