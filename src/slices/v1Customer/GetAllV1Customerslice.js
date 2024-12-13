import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllV1Customers = createAsyncThunk(
  'getAllV1Customers',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchV1Customer = createAsyncThunk(
  'searchV1Customer',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterV1Customer = createAsyncThunk(
  'filterV1Customer',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllV1CustomersSlice = createSlice({
    name: 'getAllV1Customers',
    initialState: { 
      V1_customers: [],
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
      .addCase(getAllV1Customers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllV1Customers.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customers = action.payload
      })
      .addCase(getAllV1Customers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchV1Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(searchV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customers = action.payload
      })
      .addCase(searchV1Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterV1Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(filterV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customers = action.payload
      })
      .addCase(filterV1Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllV1CustomersSlice.actions
export const getAllV1CustomersReducer = getAllV1CustomersSlice.reducer