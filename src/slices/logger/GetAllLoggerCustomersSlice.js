import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllLoggerCustomers = createAsyncThunk(
  'getAllLoggerCustomers',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_customer/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchLoggerCustomer = createAsyncThunk(
  'searchLoggerCustomer',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_customer/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterLoggerCustomer = createAsyncThunk(
  'filterLoggerCustomer',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_customer/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllLoggerCustomersSlice = createSlice({
    name: 'getAllLoggerCustomers',
    initialState: { 
      logger_customers: [], 
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
      .addCase(getAllLoggerCustomers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllLoggerCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_customers = action.payload
      })
      .addCase(getAllLoggerCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchLoggerCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(searchLoggerCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_customers = action.payload
      })
      .addCase(searchLoggerCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterLoggerCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(filterLoggerCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_customers = action.payload
      })
      .addCase(filterLoggerCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllLoggerCustomersSlice.actions
export const getAllLoggerCustomersReducer = getAllLoggerCustomersSlice.reducer