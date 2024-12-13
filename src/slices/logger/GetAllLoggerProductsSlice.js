import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllLoggerProducts = createAsyncThunk(
  'getAllLoggerProducts',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_product/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchLoggerProduct = createAsyncThunk(
  'searchLoggerProduct',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_product/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterLoggerProduct = createAsyncThunk(
  'filterLoggerProduct',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/logger_product/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllLoggerProductsSlice = createSlice({
    name: 'getAllLoggerProducts',
    initialState: { 
      logger_products: [], 
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
      .addCase(getAllLoggerProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllLoggerProducts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_products = action.payload
      })
      .addCase(getAllLoggerProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchLoggerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(searchLoggerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_products = action.payload
      })
      .addCase(searchLoggerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterLoggerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(filterLoggerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.logger_products = action.payload
      })
      .addCase(filterLoggerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllLoggerProductsSlice.actions
export const getAllLoggerProductsReducer = getAllLoggerProductsSlice.reducer