import {
  CLEAR_ERRORS,
  DATA_CENTER_CREATE_FAIL,
  DATA_CENTER_CREATE_REQUEST,
  DATA_CENTER_CREATE_SUCCESS,
  FILTER_DATA_CENTER_FAIL,
  FILTER_DATA_CENTER_REQUEST,
  FILTER_DATA_CENTER_SUCCESS,
  GET_ALL_DATA_CENTERS_FAIL,
  GET_ALL_DATA_CENTERS_REQUEST,
  GET_ALL_DATA_CENTERS_SUCCESS,
  GET_DATA_CENTER_FAIL,
  GET_DATA_CENTER_REQUEST,
  GET_DATA_CENTER_SUCCESS,
  SEARCH_DATA_CENTER_FAIL,
  SEARCH_DATA_CENTER_REQUEST,
  SEARCH_DATA_CENTER_SUCCESS,
  UPDATE_DATA_CENTER_FAIL,
  UPDATE_DATA_CENTER_REQUEST,
  UPDATE_DATA_CENTER_SUCCESS,
} from '../constants/DataCenterConstants'

export const createDataCenterReducer = (state = { data_center: {} }, action) => {
  switch (action.type) {
    case DATA_CENTER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case DATA_CENTER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data_center: action.payload,
      }
    case DATA_CENTER_CREATE_FAIL:
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

export const GetAllDataCentersReducer = (state = { data_centers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_DATA_CENTERS_REQUEST:
    case FILTER_DATA_CENTER_REQUEST:
    case SEARCH_DATA_CENTER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_DATA_CENTERS_SUCCESS:
    case FILTER_DATA_CENTER_SUCCESS:
    case SEARCH_DATA_CENTER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data_centers: action.payload,
      }
    case GET_ALL_DATA_CENTERS_FAIL:
    case FILTER_DATA_CENTER_FAIL:
    case SEARCH_DATA_CENTER_FAIL:
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

export const getDataCenterReducer = (state = { data_center: null }, action) => {
  switch (action.type) {
    case GET_DATA_CENTER_REQUEST:
      return {
        loading: true,
      }
    case GET_DATA_CENTER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data_center: action.payload,
      }
    case GET_DATA_CENTER_FAIL:
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

export const updateDataCenterReducer = (state = { data_center: {} }, action) => {
  switch (action.type) {
    case UPDATE_DATA_CENTER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_DATA_CENTER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        data_center: action.payload,
      }
    case UPDATE_DATA_CENTER_FAIL:
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
