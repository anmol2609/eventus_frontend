import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'

// Initial state
const initialState = {
  customer: {},
  customers: [],
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
}

// Async thunks
export const create_V1_customer = createAsyncThunk(
  'V1Customer/create',
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await managementAxiosInstance.post('/api/v1/customer', customerData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create customer')
    }
  },
)

export const V1_customers = createAsyncThunk(
  'V1Customer/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await managementAxiosInstance.get('/api/v1/customers')
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers')
    }
  },
)

export const V1_customer = createAsyncThunk(
  'V1Customer/getSingle',
  async (customerId, { rejectWithValue }) => {
    try {
      const { data } = await managementAxiosInstance.get(`/api/v1/customer/${customerId}`)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customer')
    }
  },
)

export const update_V1_customer = createAsyncThunk(
  'V1Customer/update',
  async ({ customerId, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await managementAxiosInstance.put(
        `/api/v1/customer/${customerId}`,
        updateData,
      )
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update customer')
    }
  },
)

// Slice setup
const V1CustomerSlice = createSlice({
  name: 'V1Customer',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null
      state.success = false
      state.isUpdated = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Create customer
      .addCase(create_V1_customer.pending, (state) => {
        state.loading = true
      })
      .addCase(create_V1_customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.customer = action.payload
      })
      .addCase(create_V1_customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Get all customers
      .addCase(V1_customers.pending, (state) => {
        state.loading = true
      })
      .addCase(V1_customers.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.customers = action.payload
      })
      .addCase(V1_customers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Get single customer
      .addCase(V1_customer.pending, (state) => {
        state.loading = true
      })
      .addCase(V1_customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.customer = action.payload
      })
      .addCase(V1_customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update customer
      .addCase(update_V1_customer.pending, (state) => {
        state.loading = true
      })
      .addCase(update_V1_customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.isUpdated = true
        state.customer = action.payload
      })
      .addCase(update_V1_customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isUpdated = false
      })
  },
})

export const { clearErrors } = V1CustomerSlice.actions
export const V1CustomerReducer = V1CustomerSlice.reducer
