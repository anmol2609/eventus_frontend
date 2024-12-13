import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getRssFeed = createAsyncThunk(
  'getRssFeed',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/aws_customer/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getRssFeedSlice = createSlice({
    name: 'getRssFeed',
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
      .addCase(getRssFeed.pending, (state) => {
        state.loading = true
      })
      .addCase(getRssFeed.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.rss_feed = action.payload
      })
      .addCase(getRssFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getRssFeedSlice.actions
export const getRssFeedReducer = getRssFeedSlice.reducer