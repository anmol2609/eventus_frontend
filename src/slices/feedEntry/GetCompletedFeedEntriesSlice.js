import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getCompletedFeedEntries = createAsyncThunk(
  'getCompletedFeedEntries',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/feed_entry/completed`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getCompletedFeedEntriesSlice = createSlice({
    name: 'getCompletedFeedEntries',
    initialState: { 
      completed_feed_entries: [], 
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
      .addCase(getCompletedFeedEntries.pending, (state) => {
        state.loading = true
      })
      .addCase(getCompletedFeedEntries.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.completed_feed_entries = action.payload
      })
      .addCase(getCompletedFeedEntries.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getCompletedFeedEntriesSlice.actions
export const getCompletedFeedEntriesReducer = getCompletedFeedEntriesSlice.reducer