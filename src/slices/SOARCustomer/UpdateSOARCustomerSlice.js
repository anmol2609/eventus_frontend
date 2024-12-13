import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateSOARCustomer = createAsyncThunk(
  'updateSOARCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/soar_customer/${id}/update`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateSOARCustomerSlice = createSlice({
    name: 'updateSOARCustomer',
    initialState: { 
      SOAR_customer: {}, 
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
      .addCase(updateSOARCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSOARCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_customer = action.payload
      })
      .addCase(updateSOARCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateSOARCustomerSlice.actions
export const updateSOARCustomerReducer = updateSOARCustomerSlice.reducer