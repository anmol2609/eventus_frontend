import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllAWSCustomers = createAsyncThunk(
  'getAllAWSCustomers',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/aws_customer/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchAWSCustomer = createAsyncThunk(
  'searchAWSCustomer',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/aws_customer/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterAWSCustomer = createAsyncThunk(
  'filterAWSCustomer',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/aws_customer/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllAWSCustomersSlice = createSlice({
    name: 'getAllAWSCustomers',
    initialState: { 
      aws_customers: [], 
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
      .addCase(getAllAWSCustomers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllAWSCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customers = action.payload
      })
      .addCase(getAllAWSCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchAWSCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(searchAWSCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customers = action.payload
      })
      .addCase(searchAWSCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterAWSCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(filterAWSCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customers = action.payload
      })
      .addCase(filterAWSCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllAWSCustomersSlice.actions
export const getAllAWSCustomersReducer = getAllAWSCustomersSlice.reducer