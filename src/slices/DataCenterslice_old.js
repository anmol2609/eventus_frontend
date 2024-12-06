import { createSlice } from '@reduxjs/toolkit'

// Create Data Center Slice
const createDataCenterSlice = createSlice({
  name: 'createDataCenter',
  initialState: { data_center: {}, loading: false, success: false, error: null },
  reducers: {
    dataCenterCreateRequest: (state) => {
      state.loading = true
    },
    dataCenterCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.data_center = action.payload
    },
    dataCenterCreateFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    }
  }
})

// Get All Data Centers Slice
const getAllDataCentersSlice = createSlice({
  name: 'getAllDataCenters',
  initialState: { data_centers: [], loading: false, success: false, error: null },
  reducers: {
    dataCentersRequest: (state) => {
      state.loading = true
    },
    dataCentersSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.data_centers = action.payload
    },
    dataCentersFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    }
  }
})

// Get Single Data Center Slice
const getDataCenterSlice = createSlice({
  name: 'getDataCenter',
  initialState: { data_center: null, loading: false, success: false, error: null },
  reducers: {
    getDataCenterRequest: (state) => {
      state.loading = true
    },
    getDataCenterSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.data_center = action.payload
    },
    getDataCenterFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    }
  }
})

// Update Data Center Slice
const updateDataCenterSlice = createSlice({
  name: 'updateDataCenter',
  initialState: { data_center: {}, loading: false, success: false, isUpdated: false, error: null },
  reducers: {
    updateDataCenterRequest: (state) => {
      state.loading = true
    },
    updateDataCenterSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.isUpdated = true
      state.data_center = action.payload
    },
    updateDataCenterFail: (state, action) => {
      state.loading = false
      state.success = false
      state.isUpdated = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.isUpdated = false
      state.success = false
    }
  }
})

// Export actions and reducers for each slice
export const { dataCenterCreateRequest, dataCenterCreateSuccess, dataCenterCreateFail, clearErrors: clearCreateErrors } = createDataCenterSlice.actions
export const { dataCentersRequest, dataCentersSuccess, dataCentersFail, clearErrors: clearGetAllErrors } = getAllDataCentersSlice.actions
export const { getDataCenterRequest, getDataCenterSuccess, getDataCenterFail, clearErrors: clearGetErrors } = getDataCenterSlice.actions
export const { updateDataCenterRequest, updateDataCenterSuccess, updateDataCenterFail, clearErrors: clearUpdateErrors } = updateDataCenterSlice.actions

export const createDataCenterReducer = createDataCenterSlice.reducer
export const getAllDataCentersReducer = getAllDataCentersSlice.reducer
export const getDataCenterReducer = getDataCenterSlice.reducer
export const updateDataCenterReducer = updateDataCenterSlice.reducer
