import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllV1Products = createAsyncThunk(
  'getAllV1Products',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_product/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchV1Product = createAsyncThunk(
  'searchV1Product',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_product/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterV1Product = createAsyncThunk(
  'filterV1Product',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_product/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllV1ProductsSlice = createSlice({
    name: 'getAllV1Products',
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
      .addCase(getAllV1Products.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllV1Products.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customers = action.payload
      })
      .addCase(getAllV1Products.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchV1Product.pending, (state) => {
        state.loading = true
      })
      .addCase(searchV1Product.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customers = action.payload
      })
      .addCase(searchV1Product.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterV1Product.pending, (state) => {
        state.loading = true
      })
      .addCase(filterV1Product.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customers = action.payload
      })
      .addCase(filterV1Product.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllV1ProductsSlice.actions
export const getAllV1ProductsReducer = getAllV1ProductsSlice.reducer
