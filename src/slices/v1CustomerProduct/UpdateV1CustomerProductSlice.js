import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateV1CustomerProduct = createAsyncThunk(
  'updateV1CustomerProduct',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/v1_customer_product/${id}/update`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateV1CustomerProductSlice = createSlice({
    name: 'updateV1CustomerProduct',
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
      .addCase(updateV1CustomerProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(updateV1CustomerProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_product = action.payload
      })
      .addCase(updateV1CustomerProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateV1CustomerProductSlice.actions
export const updateV1CustomerProductReducer = updateV1CustomerProductSlice.reducer