import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllArtifacts = createAsyncThunk(
  'getAllArtifacts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/artifact/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchArtifact = createAsyncThunk(
  'searchArtifact',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/artifact/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterArtifact = createAsyncThunk(
  'filterArtifact',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/artifact/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const getArtifactByFeedEntry = createAsyncThunk(
  'filterArtifact',
  async (feed_id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/artifact/feed_entry/${feed_id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllArtifactsSlice = createSlice({
    name: 'getAllArtifacts',
    initialState: { 
      artifacts: [], 
      loading: false, 
      success: false, 
      error: null 
    },
    reducers: {
      clearErrors: (state) => {
        state.error = null
        state.success = false
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getArtifactByFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(getArtifactByFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifacts = action.payload
      })
      .addCase(getArtifactByFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getArtifactByFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(getArtifactByFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifacts = action.payload
      })
      .addCase(getArtifactByFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchArtifact.pending, (state) => {
        state.loading = true
      })
      .addCase(searchArtifact.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifacts = action.payload
      })
      .addCase(searchArtifact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterArtifact.pending, (state) => {
        state.loading = true
      })
      .addCase(filterArtifact.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifacts = action.payload
      })
      .addCase(filterArtifact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllArtifactsSlice.actions
export const getAllArtifactsReducer = getAllArtifactsSlice.reducer