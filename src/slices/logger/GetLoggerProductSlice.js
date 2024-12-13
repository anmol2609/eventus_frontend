import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getLoggerProduct = createAsyncThunk(
  'getLoggerProduct',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_product/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getLoggerProductSlice = createSlice({
    name: 'getLoggerProduct',
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
      .addCase(getLoggerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getLoggerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_product = action.payload
      })
      .addCase(getLoggerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getLoggerProductSlice.actions
export const getLoggerProductReducer = getLoggerProductSlice.reducer