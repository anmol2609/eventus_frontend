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

export const createFeedEntryReducer = (state = { feed_entry: {} }, action) => {
  switch (action.type) {
    case FEED_ENTRY_CREATE_REQUEST:
      return {
        loading: true,
      }
    case FEED_ENTRY_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        feed_entry: action.payload,
      }
    case FEED_ENTRY_CREATE_FAIL:
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

export const GetAllFeedEntriesReducer = (state = { feed_entries: [] }, action) => {
  switch (action.type) {
    case GET_ALL_FEED_ENTRIES_REQUESTS:
    case FILTER_FEED_ENTRY_REQUEST:
    case SEARCH_FEED_ENTRY_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_FEED_ENTRIES_SUCCESS:
    case FILTER_FEED_ENTRY_SUCCESS:
    case SEARCH_FEED_ENTRY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        feed_entries: action.payload,
      }
    case GET_ALL_FEED_ENTRIES_FAIL:
    case FILTER_FEED_ENTRY_FAIL:
    case SEARCH_FEED_ENTRY_FAIL:
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

export const GetApprovedFeedEntriesReducer = (state = { approved_feed_entries: [] }, action) => {
  switch (action.type) {
    case GET_APPROVED_FEED_ENTRIES_REQUESTS:
      return {
        loading: true,
      }
    case GET_APPROVED_FEED_ENTRIES_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        approved_feed_entries: action.payload,
      }
    case GET_APPROVED_FEED_ENTRIES_FAIL:
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

export const GetCompletedFeedEntriesReducer = (state = { completed_feed_entries: [] }, action) => {
  switch (action.type) {
    case GET_COMPLETED_FEED_ENTRIES_REQUESTS:
      return {
        loading: true,
      }
    case GET_COMPLETED_FEED_ENTRIES_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        completed_feed_entries: action.payload,
      }
    case GET_COMPLETED_FEED_ENTRIES_FAIL:
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

export const getFeedEntryReducer = (state = { feed_entry: null }, action) => {
  switch (action.type) {
    case GET_FEED_ENTRY_REQUEST:
      return {
        loading: true,
      }
    case GET_FEED_ENTRY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        feed_entry: action.payload,
      }
    case GET_FEED_ENTRY_FAIL:
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

export const updateFeedEntryReducer = (state = { feed_entry: {} }, action) => {
  switch (action.type) {
    case UPDATE_FEED_ENTRY_REQUEST:
    case UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_FEED_ENTRY_SUCCESS:
    case UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        feed_entry: action.payload,
      }
    case UPDATE_FEED_ENTRY_FAIL:
    case UPDATE_BY_CURRENT_VALUE_FEED_ENTRY_FAIL:
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
