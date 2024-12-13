import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createFeedEntry = createAsyncThunk(
  'createFeedEntry',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.post(`/feed_entry/new`, payload)
    return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createFeedEntrySlice = createSlice({
  name: 'createFeedEntry',
  initialState: { 
    artifact: {},
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
    .addCase(createFeedEntry.pending, (state) => {
      state.loading = true
    })
    .addCase(createFeedEntry.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.artifact = action.payload // Save 
    })
    .addCase(createFeedEntry.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})
export const { clearErrors } = createFeedEntrySlice.actions
export const createFeedEntryReducer = createFeedEntrySlice.reducer