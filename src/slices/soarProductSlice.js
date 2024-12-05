import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock async functions for API calls, replace with real API calls in your app
export const createSOARProduct = createAsyncThunk(
  'soarProducts/createSOARProduct',
  async (productData, { rejectWithValue }) => {
    try {
      // Simulate an API call
      return productData // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const fetchAllSOARProducts = createAsyncThunk(
  'soarProducts/fetchAllSOARProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      return [] // Return product list on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Slice setup
const soarProductSlice = createSlice({
  name: 'soarProducts',
  initialState: {
    soarProducts: [],
    soarProduct: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSOARProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createSOARProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.soarProduct = action.payload
      })
      .addCase(createSOARProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchAllSOARProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllSOARProducts.fulfilled, (state, action) => {
        state.loading = false
        state.soarProducts = action.payload
      })
      .addCase(fetchAllSOARProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearErrors } = soarProductSlice.actions

export default soarProductSlice.reducer

