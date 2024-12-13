import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateSOARProduct = createAsyncThunk(
  'updateSOARProduct',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/soar_product/${id}/update`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateSOARProductSlice = createSlice({
    name: 'updateSOARProduct',
    initialState: { 
      SOAR_product: {}, 
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
      .addCase(updateSOARProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSOARProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_product = action.payload
      })
      .addCase(updateSOARProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateSOARProductSlice.actions
export const updateSOARProductReducer = updateSOARProductSlice.reducer
