import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getApprovedFeedEntries = createAsyncThunk(
  'getApprovedFeedEntries',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/feed_entry/approved_completed`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getApprovedFeedEntriesSlice = createSlice({
    name: 'getApprovedFeedEntries',
    initialState: { 
      approved_feed_entries: [], 
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
      .addCase(getApprovedFeedEntries.pending, (state) => {
        state.loading = true
      })
      .addCase(getApprovedFeedEntries.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.approved_feed_entries = action.payload
      })
      .addCase(getApprovedFeedEntries.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getApprovedFeedEntriesSlice.actions
export const getApprovedFeedEntriesReducer = getApprovedFeedEntriesSlice.reducer