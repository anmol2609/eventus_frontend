import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllV1CustomerProducts = createAsyncThunk(
  'getAllV1CustomerProducts',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer_product/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchV1CustomerProduct = createAsyncThunk(
  'searchV1CustomerProduct',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer_product/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterV1CustomerProduct = createAsyncThunk(
  'filterV1CustomerProduct',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer_product/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllV1CustomerProductsSlice = createSlice({
    name: 'getAllV1CustomerProducts',
    initialState: { 
      V1_customer_products: [],
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
      .addCase(getAllV1CustomerProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllV1CustomerProducts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_products = action.payload
      })
      .addCase(getAllV1CustomerProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchV1CustomerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(searchV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_products = action.payload
      })
      .addCase(searchV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterV1CustomerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(filterV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_products = action.payload
      })
      .addCase(filterV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllV1CustomerProductsSlice.actions
export const getAllV1CustomerProductsReducer = getAllV1CustomerProductsSlice.reducer