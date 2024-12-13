import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const configureRssFeed = createAsyncThunk(
  'configureRssFeed',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.post(`/rss_feed/configure`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const configureRssFeedSlice = createSlice({
    name: 'configureRssFeed',
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
      .addCase(configureRssFeed.pending, (state) => {
        state.loading = true
      })
      .addCase(configureRssFeed.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.rss_feed = action.payload
      })
      .addCase(configureRssFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = configureRssFeedSlice.actions
export const configureRssFeedReducer = configureRssFeedSlice.reducer