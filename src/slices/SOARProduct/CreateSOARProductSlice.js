import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createSOARProduct = createAsyncThunk(
  'createSOARProduct',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/soar_product/new`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createSOARProductSlice = createSlice({
    name: 'createSOARProduct',
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
      .addCase(createSOARProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createSOARProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_product = action.payload // Save 
      })
      .addCase(createSOARProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createSOARProductSlice.actions
export const createSOARProductReducer = createSOARProductSlice.reducer

