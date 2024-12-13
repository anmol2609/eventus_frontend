import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllSOARCustomers = createAsyncThunk(
  'getAllSOARCustomers',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_customer/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchSOARCustomer = createAsyncThunk(
  'searchSOARCustomer',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_customer/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterSOARCustomer = createAsyncThunk(
  'filterSOARCustomer',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_customer/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllSOARCustomersSlice = createSlice({
    name: 'getAllSOARCustomers',
    initialState: { 
      SOAR_customers: [], 
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
      .addCase(getAllSOARCustomers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllSOARCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_customers = action.payload
      })
      .addCase(getAllSOARCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchSOARCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(searchSOARCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_customers = action.payload
      })
      .addCase(searchSOARCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterSOARCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(filterSOARCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_customers = action.payload
      })
      .addCase(filterSOARCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllSOARCustomersSlice.actions
export const getAllSOARCustomersReducer = getAllSOARCustomersSlice.reducer