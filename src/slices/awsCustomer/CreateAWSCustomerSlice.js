import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createAWSCustomer = createAsyncThunk(
  'createAWSCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/aws_customer/new`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createAWSCustomerSlice = createSlice({
    name: 'createAWSCustomer',
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
      .addCase(createAWSCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(createAWSCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customer = action.payload // Save 
      })
      .addCase(createAWSCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createAWSCustomerSlice.actions
export const createAWSCustomerReducer = createAWSCustomerSlice.reducer