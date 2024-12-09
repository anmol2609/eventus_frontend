import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAWSCustomer = createAsyncThunk(
  'getAWSCustomer',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/aws_customer/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAWSCustomerSlice = createSlice({
    name: 'getAWSCustomer',
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
      .addCase(getAWSCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(getAWSCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customer = action.payload
      })
      .addCase(getAWSCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAWSCustomerSlice.actions
export const getAWSCustomerReducer = getAWSCustomerSlice.reducer