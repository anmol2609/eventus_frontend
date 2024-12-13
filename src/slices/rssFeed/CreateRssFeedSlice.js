import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createRssFeed = createAsyncThunk(
  'createRssFeed',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.post(`/rss_feed/new`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createRssFeedSlice = createSlice({
    name: 'createRssFeed',
    initialState: { 
      rss_feed: {},
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
      .addCase(createRssFeed.pending, (state) => {
        state.loading = true
      })
      .addCase(createRssFeed.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.rss_feed = action.payload // Save 
      })
      .addCase(createRssFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createRssFeedSlice.actions
export const createRssFeedReducer = createRssFeedSlice.reducer