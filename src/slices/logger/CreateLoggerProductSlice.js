import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createLoggerProduct = createAsyncThunk(
  'createLoggerProduct',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/logger_product/new`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createLoggerProductSlice = createSlice({
    name: 'createLoggerProduct',
    initialState: { 
      aws_customer: {},
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
      .addCase(createLoggerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createLoggerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customer = action.payload // Save 
      })
      .addCase(createLoggerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createLoggerProductSlice.actions
export const createLoggerProductReducer = createLoggerProductSlice.reducer