import {
  CLEAR_ERRORS,
  GET_ALL_MITRE_FAIL,
  GET_ALL_MITRE_REQUESTS,
  GET_ALL_MITRE_SUCCESS,
} from '../constants/MitreConstants'

export const GetMitreReducer = (state = { mitre: [] }, action) => {
  switch (action.type) {
    case GET_ALL_MITRE_REQUESTS:
      return {
        loading: true,
      }
    case GET_ALL_MITRE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        mitre: action.payload,
      }
    case GET_ALL_MITRE_FAIL:
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
