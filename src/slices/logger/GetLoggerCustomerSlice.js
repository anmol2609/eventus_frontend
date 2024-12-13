import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getLoggerCustomer = createAsyncThunk(
  'getLoggerCustomer',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_customer/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getLoggerCustomerSlice = createSlice({
    name: 'getLoggerCustomer',
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
      .addCase(getLoggerCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(getLoggerCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_customer = action.payload
      })
      .addCase(getLoggerCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getLoggerCustomerSlice.actions
export const getLoggerCustomerReducer = getLoggerCustomerSlice.reducer