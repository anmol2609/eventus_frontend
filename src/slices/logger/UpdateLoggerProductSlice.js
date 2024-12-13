import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateLoggerProduct = createAsyncThunk(
  'updateLoggerProduct',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/logger_product/${id}/update`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateLoggerProductSlice = createSlice({
    name: 'updateLoggerProduct',
    initialState: { 
      logger_product: {}, 
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
      .addCase(updateLoggerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(updateLoggerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_product = action.payload
      })
      .addCase(updateLoggerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateLoggerProductSlice.actions
export const updateLoggerProductReducer = updateLoggerProductSlice.reducer