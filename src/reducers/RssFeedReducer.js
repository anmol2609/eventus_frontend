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

export const configureRssFeedReducer = (state = { configured_rss_feed: {} }, action) => {
  switch (action.type) {
    case CONFIGURE_RSS_FEED_REQUEST:
      return {
        loading: true,
      }
    case CONFIGURE_RSS_FEED_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        is_configured: true,
        configured_rss_feed: action.payload,
      }
    case CONFIGURE_RSS_FEED_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        is_configured: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        is_configured: false,
        success: false,
      }
    default:
      return state
  }
}

export const createRssFeedReducer = (state = { rss_feed: {} }, action) => {
  switch (action.type) {
    case RSS_FEED_CREATE_REQUEST:
      return {
        loading: true,
      }
    case RSS_FEED_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        rss_feed: action.payload,
      }
    case RSS_FEED_CREATE_FAIL:
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

export const GetAllRssFeedsReducer = (state = { rss_feeds: [] }, action) => {
  switch (action.type) {
    case GET_ALL_RSS_FEEDS_REQUESTS:
    case FILTER_RSS_FEED_REQUEST:
    case SEARCH_RSS_FEED_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_RSS_FEEDS_SUCCESS:
    case FILTER_RSS_FEED_SUCCESS:
    case SEARCH_RSS_FEED_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        rss_feeds: action.payload,
      }
    case GET_ALL_RSS_FEEDS_FAIL:
    case FILTER_RSS_FEED_FAIL:
    case SEARCH_RSS_FEED_FAIL:
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

export const getRssFeedReducer = (state = { rss_feed: null }, action) => {
  switch (action.type) {
    case GET_RSS_FEED_REQUEST:
      return {
        loading: true,
      }
    case GET_RSS_FEED_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        rss_feed: action.payload,
      }
    case GET_RSS_FEED_FAIL:
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

export const updateRssFeedReducer = (state = { rss_feed: {} }, action) => {
  switch (action.type) {
    case UPDATE_RSS_FEED_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_RSS_FEED_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        rss_feed: action.payload,
      }
    case UPDATE_RSS_FEED_FAIL:
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
