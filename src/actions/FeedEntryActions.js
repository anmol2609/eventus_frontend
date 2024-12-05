import { tiAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  FEED_ENTRY_CREATE_FAIL,
  FEED_ENTRY_CREATE_REQUEST,
  FEED_ENTRY_CREATE_SUCCESS,
  FILTER_FEED_ENTRY_FAIL,
  FILTER_FEED_ENTRY_REQUEST,
  FILTER_FEED_ENTRY_SUCCESS,
  GET_ALL_FEED_ENTRIES_FAIL,
  GET_ALL_FEED_ENTRIES_REQUESTS,
  GET_ALL_FEED_ENTRIES_SUCCESS,
  GET_APPROVED_FEED_ENTRIES_FAIL,
  GET_APPROVED_FEED_ENTRIES_REQUESTS,
  GET_APPROVED_FEED_ENTRIES_SUCCESS,
  GET_COMPLETED_FEED_ENTRIES_FAIL,
  GET_COMPLETED_FEED_ENTRIES_REQUESTS,
  GET_COMPLETED_FEED_ENTRIES_SUCCESS,
  GET_FEED_ENTRY_FAIL,
  GET_FEED_ENTRY_REQUEST,
  GET_FEED_ENTRY_SUCCESS,
  SEARCH_FEED_ENTRY_FAIL,
  SEARCH_FEED_ENTRY_REQUEST,
  SEARCH_FEED_ENTRY_SUCCESS,
  UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_FAIL,
  UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_REQUEST,
  UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_SUCCESS,
  UPDATE_FEED_ENTRY_FAIL,
  UPDATE_FEED_ENTRY_REQUEST,
  UPDATE_FEED_ENTRY_SUCCESS,
} from '../constants/FeedEntryConstants'

// create new Feed Entry
export const createFeedEntry = (payload) => async (dispatch) => {
  try {
    dispatch({ type: FEED_ENTRY_CREATE_REQUEST })
    const { data } = await tiAxiosInstance.post(`/feed_entry/new`, payload)
    dispatch({ type: FEED_ENTRY_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FEED_ENTRY_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Feed Entries
export const getAllFeedEntries = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FEED_ENTRIES_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/feed_entry/all`)
    dispatch({ type: GET_ALL_FEED_ENTRIES_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_FEED_ENTRIES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Approved Feed Entries
export const getApprovedFeedEntries = () => async (dispatch) => {
  try {
    dispatch({ type: GET_APPROVED_FEED_ENTRIES_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/feed_entry/approved_completed`)
    dispatch({ type: GET_APPROVED_FEED_ENTRIES_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_APPROVED_FEED_ENTRIES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Completed Feed Entries
export const getCompletedFeedEntries = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COMPLETED_FEED_ENTRIES_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/feed_entry/completed`)
    dispatch({ type: GET_COMPLETED_FEED_ENTRIES_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_COMPLETED_FEED_ENTRIES_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Feed Entry
export const getFeedEntry = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FEED_ENTRY_REQUEST })
    const { data } = await tiAxiosInstance.get(`/feed_entry/${id}/get`)
    dispatch({ type: GET_FEED_ENTRY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_FEED_ENTRY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Feed Entry
export const updateFeedEntry = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FEED_ENTRY_REQUEST })
    const { data } = await tiAxiosInstance.put(`/feed_entry/${id}/update`, payload)
    dispatch({ type: UPDATE_FEED_ENTRY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_FEED_ENTRY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update by Current Value Feed Entry
export const updateFeedEntryByCurrentValue = (feed_id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_REQUEST })
    const { data } = await tiAxiosInstance.put(`/feed_entry/${feed_id}/update_current`, payload)
    dispatch({ type: UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Feed Entry
export const filterFeedEntry = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_FEED_ENTRY_REQUEST })
    const { data } = await tiAxiosInstance.get(`/feed_entry/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_FEED_ENTRY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_FEED_ENTRY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Feed Entry
export const searchFeedEntry = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_FEED_ENTRY_REQUEST })
    const { data } = await tiAxiosInstance.get(`/feed_entry/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_FEED_ENTRY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_FEED_ENTRY_FAIL,
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
