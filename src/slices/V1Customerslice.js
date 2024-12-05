import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  V1_customer: {},
  V1_customers: [],
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
}

// Async Thunks
export const createV1Customer = createAsyncThunk(
  'V1Customer/create',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v1/customer', {
        method: 'POST',
        body: JSON.stringify(customerData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to create customer')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getAllV1Customers = createAsyncThunk(
  'V1Customer/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v1/customers')
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch customers')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getV1Customer = createAsyncThunk(
  'V1Customer/getSingle',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/customer/${customerId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch customer')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateV1Customer = createAsyncThunk(
  'V1Customer/update',
  async ({ customerId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/customer/${customerId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update customer')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)


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

      .addCase(createV1Customer.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(createV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer = action.payload
      })
      .addCase(createV1Customer.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })


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
        state.success = false
        state.error = action.payload
      })


      .addCase(getV1Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(getV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer = action.payload
      })
      .addCase(getV1Customer.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })


      .addCase(updateV1Customer.pending, (state) => {
        state.loading = true
        state.isUpdated = false
      })
      .addCase(updateV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.isUpdated = true
        state.V1_customer = action.payload
      })
      .addCase(updateV1Customer.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.isUpdated = false
        state.error = action.payload
      })
  },
})


export const { clearErrors } = V1CustomerSlice.actions
export const V1CustomerReducer = V1CustomerSlice.reducer

export { createV1Customer, getAllV1Customers, getV1Customer, updateV1Customer }
