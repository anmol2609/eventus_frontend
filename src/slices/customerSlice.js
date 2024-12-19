import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllCustomers = createAsyncThunk(
  'getAllCustomers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/all`)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
//async function for create Customer
export const createCustomer = createAsyncThunk(
  'createCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/user/register`, payload)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)
//async function for update Customer
export const updateCustomer = createAsyncThunk(
  'updateCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload)
      //const { data } = await managementAxiosInstance.put(`/user/update_user`, payload)

      const data = await managementAxiosInstance.put(`/user/${payload.user_id}/modify`, payload.update_fields);
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

//async function for filter Customer
export const filterCustomer = createAsyncThunk(
  'filterCustomer',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call

      const { data } = await managementAxiosInstance.get(`/user/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)
//async function for search Customer
export const searchCustomer = createAsyncThunk(
  'searchCustomer',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call

      const { data } = await managementAxiosInstance.get(`/user/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message) //
    }
  },
)

//async function for get Customer
export const getCustomer = createAsyncThunk(
  'getCustomer',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message) //
    }
  },
)
// Slice setup
const customerSlice = createSlice({
  name: 'customerSlice',
  initialState: {
    customers: [],
    loading: false,
    success: false,
    error: null,
    createdCustomerStatus: false,
    updatedCustomerStatus: false,
    fetch_customer_status:false,
    customer: {}
  },
  reducers: {
    clearCustomerErrors: (state) => {
      state.error = null
      state.success = false
      state.updatedCustomerStatus = false
      state.createdCustomerStatus = false
      state.fetch_customer_status = false
    },
  },
  extraReducers: (builder) => {
    builder
      //get All Data Centers
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {

        state.loading = false
        state.success = true
        state.customers = action.payload
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //search Data Center
      .addCase(searchCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(searchCustomer.fulfilled, (state, action) => {

        state.loading = false
        state.success = true
        state.customers = action.payload
      })
      .addCase(searchCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //filter Data Center
      .addCase(filterCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(filterCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.customers = action.payload
      })
      .addCase(filterCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //create Data Center
      .addCase(createCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.createdCustomerStatus = true
        state.success = true
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })

      //update Data Center
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.updatedCustomerStatus = true
        state.success = true
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    //get User By Tenant
      .addCase(getCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.fetch_customer_status = true
        state.customer = action.payload
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export const { clearCustomerErrors } = customerSlice.actions
export const customerReducer = customerSlice.reducer

