import {
  CLEAR_ERRORS,
  FILTER_O365_CUSTOMER_FAIL,
  FILTER_O365_CUSTOMER_REQUEST,
  FILTER_O365_CUSTOMER_SUCCESS,
  GET_ALL_O365_CUSTOMERS_FAIL,
  GET_ALL_O365_CUSTOMERS_REQUESTS,
  GET_ALL_O365_CUSTOMERS_SUCCESS,
  GET_O365_CUSTOMER_FAIL,
  GET_O365_CUSTOMER_REQUEST,
  GET_O365_CUSTOMER_SUCCESS,
  O365_CUSTOMER_CREATE_FAIL,
  O365_CUSTOMER_CREATE_REQUEST,
  O365_CUSTOMER_CREATE_SUCCESS,
  SEARCH_O365_CUSTOMER_FAIL,
  SEARCH_O365_CUSTOMER_REQUEST,
  SEARCH_O365_CUSTOMER_SUCCESS,
  UPDATE_O365_CUSTOMER_FAIL,
  UPDATE_O365_CUSTOMER_REQUEST,
  UPDATE_O365_CUSTOMER_SUCCESS,
} from '../constants/O365CustomerConstants'

export const createO365CustomerReducer = (state = { O365_customer: {} }, action) => {
  switch (action.type) {
    case O365_CUSTOMER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case O365_CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        O365_customer: action.payload,
      }
    case O365_CUSTOMER_CREATE_FAIL:
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

export const GetAllO365CustomersReducer = (state = { O365_customers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_O365_CUSTOMERS_REQUESTS:
    case FILTER_O365_CUSTOMER_REQUEST:
    case SEARCH_O365_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_O365_CUSTOMERS_SUCCESS:
    case FILTER_O365_CUSTOMER_SUCCESS:
    case SEARCH_O365_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        O365_customers: action.payload,
      }
    case GET_ALL_O365_CUSTOMERS_FAIL:
    case FILTER_O365_CUSTOMER_FAIL:
    case SEARCH_O365_CUSTOMER_FAIL:
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

export const getO365CustomerReducer = (state = { O365_customer: null }, action) => {
  switch (action.type) {
    case GET_O365_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_O365_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        O365_customer: action.payload,
      }
    case GET_O365_CUSTOMER_FAIL:
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

export const updateO365CustomerReducer = (state = { O365_customer: {} }, action) => {
  switch (action.type) {
    case UPDATE_O365_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_O365_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        O365_customer: action.payload,
      }
    case UPDATE_O365_CUSTOMER_FAIL:
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
