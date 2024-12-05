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

export const createSOARCustomerReducer = (state = { SOAR_customer: {} }, action) => {
  switch (action.type) {
    case SOAR_CUSTOMER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case SOAR_CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        SOAR_customer: action.payload,
      }
    case SOAR_CUSTOMER_CREATE_FAIL:
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

export const GetAllSOARCustomersReducer = (state = { SOAR_customers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_SOAR_CUSTOMERS_REQUESTS:
    case FILTER_SOAR_CUSTOMER_REQUEST:
    case SEARCH_SOAR_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_SOAR_CUSTOMERS_SUCCESS:
    case FILTER_SOAR_CUSTOMER_SUCCESS:
    case SEARCH_SOAR_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        SOAR_customers: action.payload,
      }
    case GET_ALL_SOAR_CUSTOMERS_FAIL:
    case FILTER_SOAR_CUSTOMER_FAIL:
    case SEARCH_SOAR_CUSTOMER_FAIL:
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

export const getSOARCustomerReducer = (state = { SOAR_customer: null }, action) => {
  switch (action.type) {
    case GET_SOAR_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_SOAR_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        SOAR_customer: action.payload,
      }
    case GET_SOAR_CUSTOMER_FAIL:
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

export const updateSOARCustomerReducer = (state = { SOAR_customer: {} }, action) => {
  switch (action.type) {
    case UPDATE_SOAR_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_SOAR_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        SOAR_customer: action.payload,
      }
    case UPDATE_SOAR_CUSTOMER_FAIL:
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
