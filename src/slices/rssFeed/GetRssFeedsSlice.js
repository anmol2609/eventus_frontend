import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllRssFeeds = createAsyncThunk(
  'getAllRssFeeds',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/rss_feed/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchRssFeed = createAsyncThunk(
  'searchRssFeed',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/rss_feed/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterRssFeed = createAsyncThunk(
  'filterRssFeed',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/rss_feed/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllRssFeedsSlice = createSlice({
    name: 'getAllRssFeeds',
    initialState: { 
      aws_customers: [], 
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
      .addCase(getAllRssFeeds.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllRssFeeds.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customers = action.payload
      })
      .addCase(getAllRssFeeds.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchRssFeed.pending, (state) => {
        state.loading = true
      })
      .addCase(searchRssFeed.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customers = action.payload
      })
      .addCase(searchRssFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterRssFeed.pending, (state) => {
        state.loading = true
      })
      .addCase(filterRssFeed.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customers = action.payload
      })
      .addCase(filterRssFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllRssFeedsSlice.actions
export const getAllRssFeedsReducer = getAllRssFeedsSlice.reducer