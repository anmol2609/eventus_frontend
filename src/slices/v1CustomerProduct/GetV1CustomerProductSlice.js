import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getV1CustomerProduct = createAsyncThunk(
  'getV1CustomerProduct',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer_product/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getV1CustomerProductSlice = createSlice({
    name: 'getV1CustomerProduct',
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
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getV1CustomerProductSlice.actions
export const getV1CustomerProductReducer = getV1CustomerProductSlice.reducer