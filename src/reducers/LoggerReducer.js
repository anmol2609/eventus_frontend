import {
  CLEAR_ERRORS,
  FILTER_LOGGER_CUSTOMER_FAIL,
  FILTER_LOGGER_CUSTOMER_REQUEST,
  FILTER_LOGGER_CUSTOMER_SUCCESS,
  FILTER_LOGGER_PRODUCT_FAIL,
  FILTER_LOGGER_PRODUCT_REQUEST,
  FILTER_LOGGER_PRODUCT_SUCCESS,
  GET_ALL_LOGGER_CUSTOMERS_FAIL,
  GET_ALL_LOGGER_CUSTOMERS_REQUEST,
  GET_ALL_LOGGER_CUSTOMERS_SUCCESS,
  GET_ALL_LOGGER_PRODUCTS_FAIL,
  GET_ALL_LOGGER_PRODUCTS_REQUEST,
  GET_ALL_LOGGER_PRODUCTS_SUCCESS,
  GET_LOGGER_CUSTOMER_FAIL,
  GET_LOGGER_CUSTOMER_REQUEST,
  GET_LOGGER_CUSTOMER_SUCCESS,
  GET_LOGGER_PRODUCT_FAIL,
  GET_LOGGER_PRODUCT_REQUEST,
  GET_LOGGER_PRODUCT_SUCCESS,
  LOGGER_CUSTOMER_CREATE_FAIL,
  LOGGER_CUSTOMER_CREATE_REQUEST,
  LOGGER_CUSTOMER_CREATE_SUCCESS,
  LOGGER_PRODUCT_CREATE_FAIL,
  LOGGER_PRODUCT_CREATE_REQUEST,
  LOGGER_PRODUCT_CREATE_SUCCESS,
  SEARCH_LOGGER_CUSTOMER_FAIL,
  SEARCH_LOGGER_CUSTOMER_REQUEST,
  SEARCH_LOGGER_CUSTOMER_SUCCESS,
  SEARCH_LOGGER_PRODUCT_FAIL,
  SEARCH_LOGGER_PRODUCT_REQUEST,
  SEARCH_LOGGER_PRODUCT_SUCCESS,
  UPDATE_LOGGER_CUSTOMER_FAIL,
  UPDATE_LOGGER_CUSTOMER_REQUEST,
  UPDATE_LOGGER_CUSTOMER_SUCCESS,
  UPDATE_LOGGER_PRODUCT_FAIL,
  UPDATE_LOGGER_PRODUCT_REQUEST,
  UPDATE_LOGGER_PRODUCT_SUCCESS,
} from '../constants/LoggerConstants'

export const createLoggerCustomerReducer = (state = { logger_customer: {} }, action) => {
  switch (action.type) {
    case LOGGER_CUSTOMER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case LOGGER_CUSTOMER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        logger_customer: action.payload,
      }
    case LOGGER_CUSTOMER_CREATE_FAIL:
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

export const GetAllLoggerCustomersReducer = (state = { logger_customers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_LOGGER_CUSTOMERS_REQUEST:
    case FILTER_LOGGER_CUSTOMER_REQUEST:
    case SEARCH_LOGGER_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_LOGGER_CUSTOMERS_SUCCESS:
    case FILTER_LOGGER_CUSTOMER_SUCCESS:
    case SEARCH_LOGGER_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        logger_customers: action.payload,
      }
    case GET_ALL_LOGGER_CUSTOMERS_FAIL:
    case FILTER_LOGGER_CUSTOMER_FAIL:
    case SEARCH_LOGGER_CUSTOMER_FAIL:
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

export const getLoggerCustomerReducer = (state = { logger_customer: null }, action) => {
  switch (action.type) {
    case GET_LOGGER_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case GET_LOGGER_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        logger_customer: action.payload,
      }
    case GET_LOGGER_CUSTOMER_FAIL:
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

export const updateLoggerCustomerReducer = (state = { logger_customer: {} }, action) => {
  switch (action.type) {
    case UPDATE_LOGGER_CUSTOMER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_LOGGER_CUSTOMER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        logger_customer: action.payload,
      }
    case UPDATE_LOGGER_CUSTOMER_FAIL:
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

export const createLoggerProductReducer = (state = { logger_product: {} }, action) => {
  switch (action.type) {
    case LOGGER_PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case LOGGER_PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        logger_product: action.payload,
      }
    case LOGGER_PRODUCT_CREATE_FAIL:
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

export const GetAllLoggerProductsReducer = (state = { logger_products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_LOGGER_PRODUCTS_REQUEST:
    case FILTER_LOGGER_PRODUCT_REQUEST:
    case SEARCH_LOGGER_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_LOGGER_PRODUCTS_SUCCESS:
    case FILTER_LOGGER_PRODUCT_SUCCESS:
    case SEARCH_LOGGER_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        logger_products: action.payload,
      }
    case GET_ALL_LOGGER_PRODUCTS_FAIL:
    case FILTER_LOGGER_PRODUCT_FAIL:
    case SEARCH_LOGGER_PRODUCT_FAIL:
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

export const getLoggerProductReducer = (state = { logger_product: null }, action) => {
  switch (action.type) {
    case GET_LOGGER_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case GET_LOGGER_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        logger_product: action.payload,
      }
    case GET_LOGGER_PRODUCT_FAIL:
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

export const updateLoggerProductReducer = (state = { logger_product: {} }, action) => {
  switch (action.type) {
    case UPDATE_LOGGER_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_LOGGER_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        logger_product: action.payload,
      }
    case UPDATE_LOGGER_PRODUCT_FAIL:
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
