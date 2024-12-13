import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createV1CustomerProduct = createAsyncThunk(
  'createV1CustomerProduct',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/v1_customer_product/new`, payload)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createV1CustomerProductSlice = createSlice({
    name: 'createV1CustomerProduct',
    initialState: { 
      V1_customer_product: {},
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
      .addCase(createV1CustomerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_product = action.payload // Save 
      })
      .addCase(createV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createV1CustomerProductSlice.actions
export const createV1CustomerProductReducer = createV1CustomerProductSlice.reducer