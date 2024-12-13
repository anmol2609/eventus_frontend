import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateRssFeed = createAsyncThunk(
  'updateRssFeed',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.put(`/rss_feed/${payload.id}/update`, payload.data)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateRssFeedSlice = createSlice({
    name: 'updateRssFeed',
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
      .addCase(updateRssFeed.pending, (state) => {
        state.loading = true
      })
      .addCase(updateRssFeed.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.rss_feed = action.payload
      })
      .addCase(updateRssFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateRssFeedSlice.actions
export const updateRssFeedReducer = updateRssFeedSlice.reducer