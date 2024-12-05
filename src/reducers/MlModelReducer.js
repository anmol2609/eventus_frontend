import {
  CLEAR_ERRORS,
  GET_ML_MODEL_FAIL,
  GET_ML_MODEL_REQUEST,
  GET_ML_MODEL_SUCCESS,
  UPDATE_ML_MODEL_FAIL,
  UPDATE_ML_MODEL_REQUEST,
  UPDATE_ML_MODEL_SUCCESS,
} from '../constants/MlModelConstants'

export const getMlModelReducer = (state = { model: null }, action) => {
  switch (action.type) {
    case GET_ML_MODEL_REQUEST:
      return {
        loading: true,
      }
    case GET_ML_MODEL_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        model: action.payload,
      }
    case GET_ML_MODEL_FAIL:
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

export const updateMlModelReducer = (state = { ml_model: {} }, action) => {
  switch (action.type) {
    case UPDATE_ML_MODEL_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_ML_MODEL_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        isUpdated: true,
        ml_model: action.payload,
      }
    case UPDATE_ML_MODEL_FAIL:
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
