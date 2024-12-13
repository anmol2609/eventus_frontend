import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createSOARCustomer = createAsyncThunk(
  'createSOARCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/soar_customer/new`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createSOARCustomerSlice = createSlice({
    name: 'createSOARCustomer',
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
      .addCase(createSOARCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(createSOARCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_customer = action.payload // Save 
      })
      .addCase(createSOARCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createSOARCustomerSlice.actions
export const createSOARCustomerReducer = createSOARCustomerSlice.reducer