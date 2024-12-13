import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllFeedEntries = createAsyncThunk(
  'getAllFeedEntries',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/feed_entry/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchFeedEntry = createAsyncThunk(
  'searchFeedEntry',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/feed_entry/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterFeedEntry = createAsyncThunk(
  'filterFeedEntry',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/feed_entry/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const getArtifactByFeedEntry = createAsyncThunk(
  'getArtifactByFeedEntry',
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
const getAllFeedEntriesSlice = createSlice({
    name: 'getAllFeedEntries',
    initialState: { 
      feed_entries: [], 
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
      .addCase(getAllFeedEntries.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllFeedEntries.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entries = action.payload
      })
      .addCase(getAllFeedEntries.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getArtifactByFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(getArtifactByFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entries = action.payload
      })
      .addCase(getArtifactByFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(filterFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entries = action.payload
      })
      .addCase(filterFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(searchFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entries = action.payload
      })
      .addCase(searchFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllFeedEntriesSlice.actions
export const getAllFeedEntriesReducer = getAllFeedEntriesSlice.reducer