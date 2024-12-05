import { tiAxiosInstance } from 'src/config/Axios'
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

// create new Artifacts
export const createArtifact = (payload) => async (dispatch) => {
  try {
    dispatch({ type: ARTIFACT_CREATE_REQUEST })
    const { data } = await tiAxiosInstance.post(`/artifact/new`, payload)
    dispatch({ type: ARTIFACT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ARTIFACT_CREATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get All Artifacts
export const getAllArtifacts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ARTIFACTS_REQUESTS })
    const { data } = await tiAxiosInstance.get(`/artifact/all`)
    dispatch({ type: GET_ALL_ARTIFACTS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ALL_ARTIFACTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Artifacts
export const getArtifact = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ARTIFACT_REQUEST })
    const { data } = await tiAxiosInstance.get(`/artifact/${id}/get`)
    dispatch({ type: GET_ARTIFACT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ARTIFACT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get Artifact by Feed Entry
export const getArtifactByFeedEntry = (feed_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ARTIFACT_BY_FEED_ENTRY_REQUEST })
    const { data } = await tiAxiosInstance.get(`/artifact/feed_entry/${feed_id}/get`)
    dispatch({ type: GET_ARTIFACT_BY_FEED_ENTRY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: GET_ARTIFACT_BY_FEED_ENTRY_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update Artifacts
export const updateArtifact = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ARTIFACT_REQUEST })
    const { data } = await tiAxiosInstance.put(`/artifact/${id}/update`, payload)
    dispatch({ type: UPDATE_ARTIFACT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: UPDATE_ARTIFACT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// filter Artifacts
export const filterArtifact = (filters) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_ARTIFACT_REQUEST })
    const { data } = await tiAxiosInstance.get(`/artifact/filter`, {
      params: filters,
    })
    dispatch({ type: FILTER_ARTIFACT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: FILTER_ARTIFACT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Search Artifacts
export const searchArtifact = (term) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_ARTIFACT_REQUEST })
    const { data } = await tiAxiosInstance.get(`/artifact/search`, {
      params: { term },
    })
    dispatch({ type: SEARCH_ARTIFACT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: SEARCH_ARTIFACT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Test Artifacts
export const testArtifact = (artifacts) => async (dispatch) => {
  try {
    dispatch({ type: TEST_ARTIFACTS_REQUEST })
    const { data } = await tiAxiosInstance.post(`/artifact/test`, { artifacts })
    dispatch({ type: TEST_ARTIFACTS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: TEST_ARTIFACTS_FAIL,
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
