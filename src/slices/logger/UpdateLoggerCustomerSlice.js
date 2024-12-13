import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateLoggerCustomer = createAsyncThunk(
  'updateLoggerCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/logger_customer/${payload.id}/update`, payload.data)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateLoggerCustomerSlice = createSlice({
    name: 'updateLoggerCustomer',
    initialState: { 
      logger_customer: {}, 
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
      .addCase(updateLoggerCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateLoggerCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_customer = action.payload
      })
      .addCase(updateLoggerCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateLoggerCustomerSlice.actions
export const updateLoggerCustomerReducer = updateLoggerCustomerSlice.reducer