import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllSOARProducts = createAsyncThunk(
  'getAllSOARProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_product/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const searchSOARProduct = createAsyncThunk(
  'searchSOARProduct',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_product/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

export const filterSOARProduct = createAsyncThunk(
  'filterSOARProduct',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_product/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllSOARProductsSlice = createSlice({
    name: 'getAllSOARProducts',
    initialState: { 
      SOAR_products: [], 
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
      .addCase(getAllSOARProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllSOARProducts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_products = action.payload
      })
      .addCase(getAllSOARProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchSOARProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(searchSOARProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_products = action.payload
      })
      .addCase(searchSOARProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterSOARProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(filterSOARProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_products = action.payload
      })
      .addCase(filterSOARProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllSOARProductsSlice.actions
export const getAllSOARProductsReducer = getAllSOARProductsSlice.reducer
