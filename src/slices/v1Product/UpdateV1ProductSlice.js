import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateV1Product = createAsyncThunk(
  'updateV1Product',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/v1_product/${id}/update`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateV1ProductSlice = createSlice({
    name: 'updateV1Product',
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
      .addCase(updateV1Product.pending, (state) => {
        state.loading = true
      })
      .addCase(updateV1Product.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer = action.payload
      })
      .addCase(updateV1Product.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateV1ProductSlice.actions
export const updateV1ProductReducer = updateV1ProductSlice.reducer