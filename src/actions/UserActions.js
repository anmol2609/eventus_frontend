import { managementAxiosInstance } from 'src/config/Axios'
import axios from 'axios'
import {
  CLEAR_ERRORS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  FILTER_USER_FAIL,
  FILTER_USER_REQUEST,
  FILTER_USER_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUESTS,
  GET_ALL_USERS_SUCCESS,
  GET_TENANT_BY_TENANCY_LEVEL_FAIL,
  GET_TENANT_BY_TENANCY_LEVEL_REQUEST,
  GET_TENANT_BY_TENANCY_LEVEL_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from '../constants/UserConstants'

// create new User
export const createUserByTenant = (payload) => async (dispatch) => {
  try {
    dispatch({ type: USER_CREATE_REQUEST })
    const { data } = await managementAxiosInstance.post(`/user/create_user`, payload)
    dispatch({ type: USER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get User
export const getUserByTenant = (id) => async (dispatch) => {
  try {

    dispatch({ type: GET_USER_REQUEST })
    //const  { data }  = await axios.get('https://jsonplaceholder.typicode.com/users/' + id)
    const { data } = await managementAxiosInstance.get(`/user/get_user_by_id?user_id=${id}`)
    dispatch({ type: GET_USER_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter User
export const filterUser = (filters) => async (dispatch) => {
    try {
      dispatch({ type: FILTER_USER_REQUEST })
      const { data } = await managementAxiosInstance.post(`/user/filter_users`,filters )
      dispatch({ type: FILTER_USER_SUCCESS, payload: data.users })
    } catch (error) {
      dispatch({
        type: FILTER_USER_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUESTS })
    //const  { data }  = await axios.get('https://jsonplaceholder.typicode.com/users')
    const { data } = await managementAxiosInstance.get(`/user/list_user`)
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    })
  }
}


// update User
export const updateUserByTenant = (payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })
    const { data } = await managementAxiosInstance.put(`/user/update_user`, payload)
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}
// get  Users on the basis of the tenancy level
export const getTenantByTenancyLevel = (level) => async (dispatch) => {
  try {
    dispatch({ type: GET_TENANT_BY_TENANCY_LEVEL_REQUEST })
    //const  { data }  = await axios.get('https://jsonplaceholder.typicode.com/users')
    const { data } = await managementAxiosInstance.get(`/tenants/tenancy?tenancy_level=${level}`)
    dispatch({ type: GET_TENANT_BY_TENANCY_LEVEL_SUCCESS, payload: data.users })
  } catch (error) {
    dispatch({
      type: GET_TENANT_BY_TENANCY_LEVEL_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search user
export const searchUserByEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_USER_REQUEST })
    const { data } = await managementAxiosInstance.post(`/user/get_user_email`,{"user_email" : email})
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data.users })
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}
// Used to clear all the errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}

// Delete User
export const DeleteUser = (id) => async (dispatch) => {
  try {
    let obj = {
      "user_id": id
    }
    dispatch({ type: DELETE_USER_REQUEST })
    const { data } = await managementAxiosInstance.post(`/user/delete_user`,obj )
    dispatch({ type: DELETE_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.message,
    })
  }
}