import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getFeedEntry = createAsyncThunk(
  'getFeedEntry',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/feed_entry/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getFeedEntrySlice = createSlice({
    name: 'getFeedEntry',
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
      .addCase(getFeedEntry.pending, (state) => {
        state.loading = true
      })
      .addCase(getFeedEntry.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feed_entry = action.payload
      })
      .addCase(getFeedEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getFeedEntrySlice.actions
export const getFeedEntryReducer = getFeedEntrySlice.reducer