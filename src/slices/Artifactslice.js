import { createSlice } from '@reduxjs/toolkit'

// Create Artifact Slice
const createArtifactSlice = createSlice({
  name: 'createArtifact',
  initialState: { artifact: {}, loading: false, success: false, error: null },
  reducers: {
    artifactCreateRequest: (state) => {
      state.loading = true
    },
    artifactCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.artifact = action.payload
    },
    artifactCreateFail: (state, action) => {
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

// Get Artifacts Slice
const getArtifactsSlice = createSlice({
  name: 'getArtifacts',
  initialState: { artifacts: [], loading: false, success: false, error: null },
  reducers: {
    artifactsRequest: (state) => {
      state.loading = true
    },
    artifactsSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.artifacts = action.payload
    },
    artifactsFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    }
  }
})

// Get Single Artifact Slice
const getArtifactSlice = createSlice({
  name: 'getArtifact',
  initialState: { artifact: null, loading: false, success: false, error: null },
  reducers: {
    getArtifactRequest: (state) => {
      state.loading = true
    },
    getArtifactSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.artifact = action.payload
    },
    getArtifactFail: (state, action) => {
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

// Update Artifact Slice
const updateArtifactSlice = createSlice({
  name: 'updateArtifact',
  initialState: { artifact: {}, loading: false, success: false, isUpdated: false, error: null },
  reducers: {
    updateArtifactRequest: (state) => {
      state.loading = true
    },
    updateArtifactSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.isUpdated = true
      state.artifact = action.payload
    },
    updateArtifactFail: (state, action) => {
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

// Test Artifacts Slice
const testArtifactsSlice = createSlice({
  name: 'testArtifacts',
  initialState: { data: [], loading: false, success: false, error: null },
  reducers: {
    testArtifactsRequest: (state) => {
      state.loading = true
    },
    testArtifactsSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.data = action.payload
    },
    testArtifactsFail: (state, action) => {
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

// Export actions and reducers for each slice
export const { artifactCreateRequest, artifactCreateSuccess, artifactCreateFail, clearErrors: clearCreateErrors } = createArtifactSlice.actions
export const { artifactsRequest, artifactsSuccess, artifactsFail, clearErrors: clearGetAllErrors } = getArtifactsSlice.actions
export const { getArtifactRequest, getArtifactSuccess, getArtifactFail, clearErrors: clearGetErrors } = getArtifactSlice.actions
export const { updateArtifactRequest, updateArtifactSuccess, updateArtifactFail, clearErrors: clearUpdateErrors } = updateArtifactSlice.actions
export const { testArtifactsRequest, testArtifactsSuccess, testArtifactsFail, clearErrors: clearTestErrors } = testArtifactsSlice.actions

export const createArtifactReducer = createArtifactSlice.reducer
export const getArtifactsReducer = getArtifactsSlice.reducer
export const getArtifactReducer = getArtifactSlice.reducer
export const updateArtifactReducer = updateArtifactSlice.reducer
export const testArtifactsReducer = testArtifactsSlice.reducer
