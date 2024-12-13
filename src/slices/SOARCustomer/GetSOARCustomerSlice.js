import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getSOARCustomer = createAsyncThunk(
  'getSOARCustomer',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/soar_customer/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getSOARCustomerSlice = createSlice({
    name: 'getSOARCustomer',
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
      .addCase(getSOARCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(getSOARCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.SOAR_customer = action.payload
      })
      .addCase(getSOARCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getSOARCustomerSlice.actions
export const getSOARCustomerReducer = getSOARCustomerSlice.reducer
