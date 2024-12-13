import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateFeedEntry = createAsyncThunk(
  'updateFeedEntry',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.put(`/feed_entry/${payload.id}/update`, payload.data)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateFeedEntrySlice = createSlice({
    name: 'updateFeedEntry',
    initialState: { 
      feed_entry: {}, 
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
      .addCase(updateFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entry = action.payload
      })
      .addCase(updateFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateFeedEntrySlice.actions
export const updateFeedEntryReducer = updateFeedEntrySlice.reducer