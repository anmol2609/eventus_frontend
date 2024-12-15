import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateAWSCustomer = createAsyncThunk(
  'updateAWSCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/aws_customer/${payload.id}/update`, payload.user)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateAWSCustomerSlice = createSlice({
    name: 'updateAWSCustomer',
    initialState: { 
      aws_customer: {}, 
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
      .addCase(updateAWSCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAWSCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customer = action.payload
      })
      .addCase(updateAWSCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateAWSCustomerSlice.actions
export const updateAWSCustomerReducer = updateAWSCustomerSlice.reducer