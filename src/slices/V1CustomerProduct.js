import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Initial State
const initialState = {
  V1_customer_product: {},
  V1_customer_products: [],
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
}

// Async Thunks
export const createV1CustomerProduct = createAsyncThunk(
  'V1CustomerProduct/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v1/customer-product', {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to create product')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getV1CustomerProductForCustomer = createAsyncThunk(
  'V1CustomerProduct/getAll',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/customer-products/${customerId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch products')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getV1CustomerProduct = createAsyncThunk(
  'V1CustomerProduct/getSingle',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/customer-product/${productId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch product')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateV1CustomerProduct = createAsyncThunk(
  'V1CustomerProduct/update',
  async ({ productId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/customer-product/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update product')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)


const V1CustomerProductSlice = createSlice({
  name: 'V1CustomerProduct',
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
      
      .addCase(createV1CustomerProduct.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(createV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_product = action.payload
      })
      .addCase(createV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      
      .addCase(getV1CustomerProductForCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(getV1CustomerProductForCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_products = action.payload
      })
      .addCase(getV1CustomerProductForCustomer.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })

      .addCase(getV1CustomerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_product = action.payload
      })
      .addCase(getV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })

      .addCase(updateV1CustomerProduct.pending, (state) => {
        state.loading = true
        state.isUpdated = false
      })
      .addCase(updateV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.isUpdated = true
        state.V1_customer_product = action.payload
      })
      .addCase(updateV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.isUpdated = false
        state.error = action.payload
      })
  },
})


export const { clearErrors } = V1CustomerProductSlice.actions
export const V1CustomerProductReducer = V1CustomerProductSlice.reducer
