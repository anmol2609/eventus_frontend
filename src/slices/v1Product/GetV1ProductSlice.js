import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getV1Product = createAsyncThunk(
  'getV1Product',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_product/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getV1ProductSlice = createSlice({
    name: 'getV1Product',
    initialState: { 
      V1_customer: {}, 
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
      .addCase(getV1Product.pending, (state) => {
        state.loading = true
      })
      .addCase(getV1Product.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer = action.payload
      })
      .addCase(getV1Product.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getV1ProductSlice.actions
export const getV1ProductReducer = getV1ProductSlice.reducer