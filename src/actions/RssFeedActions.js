import { tiAxiosInstance } from 'src/config/Axios'
import {
  CLEAR_ERRORS,
  CONFIGURE_RSS_FEED_FAIL,
  CONFIGURE_RSS_FEED_REQUEST,
  CONFIGURE_RSS_FEED_SUCCESS,
  FILTER_RSS_FEED_FAIL,
  FILTER_RSS_FEED_REQUEST,
  FILTER_RSS_FEED_SUCCESS,
  GET_ALL_RSS_FEEDS_FAIL,
  GET_ALL_RSS_FEEDS_REQUESTS,
  GET_ALL_RSS_FEEDS_SUCCESS,
  GET_RSS_FEED_FAIL,
  GET_RSS_FEED_REQUEST,
  GET_RSS_FEED_SUCCESS,
  RSS_FEED_CREATE_FAIL,
  RSS_FEED_CREATE_REQUEST,
  RSS_FEED_CREATE_SUCCESS,
  SEARCH_RSS_FEED_FAIL,
  SEARCH_RSS_FEED_REQUEST,
  SEARCH_RSS_FEED_SUCCESS,
  UPDATE_RSS_FEED_FAIL,
  UPDATE_RSS_FEED_REQUEST,
  UPDATE_RSS_FEED_SUCCESS,
} from '../constants/RssFeedConstants'

// create new Rss Feed
export const createRssFeed = (payload) => async (dispatch) => {
  try {
    dispatch({ type: RSS_FEED_CREATE_REQUEST })
    const { data } = await tiAxiosInstance.post(`/rss_feed/new`, payload)
    dispatch({ type: RSS_FEED_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: RSS_FEED_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// configure new Rss Feed
export const configureRssFeed = (payload) => async (dispatch) => {
  try {
    dispatch({ type: CONFIGURE_RSS_FEED_REQUEST })
    const { data } = await tiAxiosInstance.post(`/rss_feed/configure`, payload)
    dispatch({ type: CONFIGURE_RSS_FEED_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONFIGURE_RSS_FEED_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Rss Feeds
export const getAllRssFeeds = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_RSS_FEEDS_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/rss_feed/all`)
    dispatch({ type: GET_ALL_RSS_FEEDS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_RSS_FEEDS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Rss Feed
export const getRssFeed = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_RSS_FEED_REQUEST })
    const { data } = await tiAxiosInstance.get(`/rss_feed/${id}/get`)
    dispatch({ type: GET_RSS_FEED_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_RSS_FEED_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Rss Feed
export const updateRssFeed = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_RSS_FEED_REQUEST })
    const { data } = await tiAxiosInstance.put(`/rss_feed/${id}/update`, payload)
    dispatch({ type: UPDATE_RSS_FEED_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_RSS_FEED_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Rss Feed
export const filterRssFeed = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_RSS_FEED_REQUEST })
    const { data } = await tiAxiosInstance.get(`/rss_feed/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_RSS_FEED_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_RSS_FEED_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Rss Feed
export const searchRssFeed = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_RSS_FEED_REQUEST })
    const { data } = await tiAxiosInstance.get(`/rss_feed/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_RSS_FEED_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_RSS_FEED_FAIL,
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
