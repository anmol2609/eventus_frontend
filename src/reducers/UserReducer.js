import {
  CLEAR_ERRORS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  FILTER_USER_FAIL,
  FILTER_USER_REQUEST,
  FILTER_USER_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUESTS,
  GET_ALL_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  GET_TENANT_BY_TENANCY_LEVEL_REQUEST,
  GET_TENANT_BY_TENANCY_LEVEL_SUCCESS,
  GET_TENANT_BY_TENANCY_LEVEL_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from '../constants/UserConstants'

export const createUserReducer = (state = { userByTenant: {} }, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userByTenant: action.payload,
      }
    case USER_CREATE_FAIL:
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

export const GetAllUsersReducer = (state = { userList: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUESTS:
    case FILTER_USER_REQUEST:
    case SEARCH_USER_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_USERS_SUCCESS:
    case FILTER_USER_SUCCESS:
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userList: action.payload,
      }
    case GET_ALL_USERS_FAIL:
    case FILTER_USER_FAIL:
    case SEARCH_USER_FAIL:
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

export const getUserByTenantReducer = (state = { userByTenant: null }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        loading: true,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userByTenant: action.payload,
      }
    case GET_USER_FAIL:
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

export const updateUserReducer = (state = { userByTenant: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        userByTenant: action.payload,
      }
    case UPDATE_USER_FAIL:
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

export const getTenantByTenancyLevelReducer = (state = { tenants: [] }, action) => {
  switch (action.type) {
    case GET_TENANT_BY_TENANCY_LEVEL_REQUEST:
      return {
        loading: true,
      }
    case GET_TENANT_BY_TENANCY_LEVEL_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        tenants: action.payload,
      }
    case GET_TENANT_BY_TENANCY_LEVEL_FAIL:
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

export const deleteUserReducer = (state = {deleted_user:{}}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        loading: true,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        deleted_user: action.payload,
      }
    case DELETE_USER_FAIL:
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