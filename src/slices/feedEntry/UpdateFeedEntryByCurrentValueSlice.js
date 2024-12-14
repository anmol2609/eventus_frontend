import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateFeedEntryByCurrentValue = createAsyncThunk(
  'updateFeedEntryByCurrentValue',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.put(`/feed_entry/${payload.feed_id}/update_current`, payload.data)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateFeedEntryByCurrentValueSlice = createSlice({
    name: 'updateFeedEntryByCurrentValue',
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
      .addCase(updateFeedEntryByCurrentValue.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFeedEntryByCurrentValue.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entry = action.payload
      })
      .addCase(updateFeedEntryByCurrentValue.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateFeedEntryByCurrentValueSlice.actions
export const updateFeedEntryByCurrentValueReducer = updateFeedEntryByCurrentValueSlice.reducer