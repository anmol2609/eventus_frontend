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

export const AWSCustomerCreateReducer = (state = { aws_customer: {} }, action) => {
  switch (action.type) {
    case AWS_CUSTOMER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case AWS_CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        aws_customer: action.payload,
      }
    case AWS_CUSTOMER_CREATE_FAIL:
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

export const getAllAWSCustomersReducer = (state = { aws_customers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_AWS_CUSTOMERS_REQUEST:
    case FILTER_AWS_CUSTOMER_REQUEST:
    case SEARCH_AWS_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_AWS_CUSTOMERS_SUCCESS:
    case FILTER_AWS_CUSTOMER_SUCCESS:
    case SEARCH_AWS_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        aws_customers: action.payload,
      }
    case GET_ALL_AWS_CUSTOMERS_FAIL:
    case FILTER_AWS_CUSTOMER_FAIL:
    case SEARCH_AWS_CUSTOMER_FAIL:
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

export const getAWSCustomerReducer = (state = { aws_customer: null }, action) => {
  switch (action.type) {
    case GET_AWS_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_AWS_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        aws_customer: action.payload,
      }
    case GET_AWS_CUSTOMER_FAIL:
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

export const updateAWSCustomerReducer = (state = { aws_customer: {} }, action) => {
  switch (action.type) {
    case UPDATE_AWS_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_AWS_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        aws_customer: action.payload,
      }
    case UPDATE_AWS_CUSTOMER_FAIL:
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
