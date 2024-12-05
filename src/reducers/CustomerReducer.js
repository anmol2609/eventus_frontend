import {
  CLEAR_ERRORS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  FILTER_CUSTOMER_FAIL,
  FILTER_CUSTOMER_REQUEST,
  FILTER_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMERS_FAIL,
  GET_ALL_CUSTOMERS_REQUESTS,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_L0_CUSTOMER_FAIL,
  GET_L0_CUSTOMER_REQUEST,
  GET_L0_CUSTOMER_SUCCESS,
  GET_L1_CUSTOMER_FAIL,
  GET_L1_CUSTOMER_REQUEST,
  GET_L1_CUSTOMER_SUCCESS,
  GET_L2_CUSTOMER_FAIL,
  GET_L2_CUSTOMER_REQUEST,
  GET_L2_CUSTOMER_SUCCESS,
  GET_L3_CUSTOMER_FAIL,
  GET_L3_CUSTOMER_REQUEST,
  GET_L3_CUSTOMER_SUCCESS,
  SEARCH_CUSTOMER_FAIL,
  SEARCH_CUSTOMER_REQUEST,
  SEARCH_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
} from '../constants/CustomerConstants'

export const createCustomerReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        customer: action.payload,
      }
    case CUSTOMER_CREATE_FAIL:
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

export const GetAllCustomersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_REQUESTS:
    case FILTER_CUSTOMER_REQUEST:
    case SEARCH_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_CUSTOMERS_SUCCESS:
    case FILTER_CUSTOMER_SUCCESS:
    case SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        users: action.payload,
      }
    case GET_ALL_CUSTOMERS_FAIL:
    case FILTER_CUSTOMER_FAIL:
    case SEARCH_CUSTOMER_FAIL:
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

export const getCustomerReducer = (state = { customer: null }, action) => {
  switch (action.type) {
    case GET_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        customer: action.payload,
      }
    case GET_CUSTOMER_FAIL:
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

export const updateCustomerReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        customer: action.payload,
      }
    case UPDATE_CUSTOMER_FAIL:
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

export const getL0CustomerReducer = (state = { l0_customers: [] }, action) => {
  switch (action.type) {
    case GET_L0_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_L0_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        l0_customers: action.payload,
      }
    case GET_L0_CUSTOMER_FAIL:
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

export const getL1CustomerReducer = (state = { l1_customers: [] }, action) => {
  switch (action.type) {
    case GET_L1_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_L1_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        l1_customers: action.payload,
      }
    case GET_L1_CUSTOMER_FAIL:
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

export const getL2CustomerReducer = (state = { l2_customers: [] }, action) => {
  switch (action.type) {
    case GET_L2_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_L2_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        l2_customers: action.payload,
      }
    case GET_L2_CUSTOMER_FAIL:
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

export const getL3CustomerReducer = (state = { l3_customers: [] }, action) => {
  switch (action.type) {
    case GET_L3_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_L3_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        l3_customers: action.payload,
      }
    case GET_L3_CUSTOMER_FAIL:
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
