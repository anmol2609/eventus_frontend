import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getSOARProduct = createAsyncThunk(
  'getSOARProduct',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_product/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getSOARProductSlice = createSlice({
    name: 'getSOARProduct',
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
      .addCase(getSOARProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getSOARProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_product = action.payload
      })
      .addCase(getSOARProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getSOARProductSlice.actions
export const getSOARProductReducer = getSOARProductSlice.reducer