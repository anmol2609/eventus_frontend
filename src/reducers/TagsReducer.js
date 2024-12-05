import {
  CLEAR_ERRORS,
  GET_ALL_TAGS_FAIL,
  GET_ALL_TAGS_REQUESTS,
  GET_ALL_TAGS_SUCCESS,
} from '../constants/TagsConstants'

export const GetTagsReducer = (state = { tags: {} }, action) => {
  switch (action.type) {
    case GET_ALL_TAGS_REQUESTS:
      return {
        loading: true,
      }
    case GET_ALL_TAGS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        tags: action.payload,
      }
    case GET_ALL_TAGS_FAIL:
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
