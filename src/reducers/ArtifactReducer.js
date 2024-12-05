import {
  ARTIFACT_CREATE_FAIL,
  ARTIFACT_CREATE_REQUEST,
  ARTIFACT_CREATE_SUCCESS,
  CLEAR_ERRORS,
  FILTER_ARTIFACT_FAIL,
  FILTER_ARTIFACT_REQUEST,
  FILTER_ARTIFACT_SUCCESS,
  GET_ALL_ARTIFACTS_FAIL,
  GET_ALL_ARTIFACTS_REQUESTS,
  GET_ALL_ARTIFACTS_SUCCESS,
  GET_ARTIFACT_BY_FEED_ENTRY_FAIL,
  GET_ARTIFACT_BY_FEED_ENTRY_REQUEST,
  GET_ARTIFACT_BY_FEED_ENTRY_SUCCESS,
  GET_ARTIFACT_FAIL,
  GET_ARTIFACT_REQUEST,
  GET_ARTIFACT_SUCCESS,
  SEARCH_ARTIFACT_FAIL,
  SEARCH_ARTIFACT_REQUEST,
  SEARCH_ARTIFACT_SUCCESS,
  TEST_ARTIFACTS_FAIL,
  TEST_ARTIFACTS_REQUEST,
  TEST_ARTIFACTS_SUCCESS,
  UPDATE_ARTIFACT_FAIL,
  UPDATE_ARTIFACT_REQUEST,
  UPDATE_ARTIFACT_SUCCESS,
} from '../constants/ArtifactConstants'

export const createArtifactReducer = (state = { artifact: {} }, action) => {
  switch (action.type) {
    case ARTIFACT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ARTIFACT_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        artifact: action.payload,
      }
    case ARTIFACT_CREATE_FAIL:
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

export const GetArtifactsReducer = (state = { artifacts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ARTIFACTS_REQUESTS:
    case GET_ARTIFACT_BY_FEED_ENTRY_REQUEST:
    case FILTER_ARTIFACT_REQUEST:
    case SEARCH_ARTIFACT_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_ARTIFACTS_SUCCESS:
    case GET_ARTIFACT_BY_FEED_ENTRY_SUCCESS:
    case FILTER_ARTIFACT_SUCCESS:
    case SEARCH_ARTIFACT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        artifacts: action.payload,
      }
    case GET_ALL_ARTIFACTS_FAIL:
    case GET_ARTIFACT_BY_FEED_ENTRY_FAIL:
    case FILTER_ARTIFACT_FAIL:
    case SEARCH_ARTIFACT_FAIL:
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

export const getArtifactReducer = (state = { artifact: null }, action) => {
  switch (action.type) {
    case GET_ARTIFACT_REQUEST:
      return {
        loading: true,
      }
    case GET_ARTIFACT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        artifact: action.payload,
      }
    case GET_ARTIFACT_FAIL:
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

export const updateArtifactReducer = (state = { artifact: {} }, action) => {
  switch (action.type) {
    case UPDATE_ARTIFACT_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_ARTIFACT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        artifact: action.payload,
      }
    case UPDATE_ARTIFACT_FAIL:
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

export const testArtifactsReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case TEST_ARTIFACTS_REQUEST:
      return {
        loading: true,
      }
    case TEST_ARTIFACTS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data: action.payload,
      }
    case TEST_ARTIFACTS_FAIL:
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
