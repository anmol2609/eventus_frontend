import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createV1Customer = createAsyncThunk(
  'createV1Customer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/v1_customer/new`, payload)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createV1CustomerSlice = createSlice({
    name: 'createV1Customer',
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
      .addCase(createV1Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(createV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.aws_customer = action.payload // Save 
      })
      .addCase(createV1Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createV1CustomerSlice.actions
export const createV1CustomerReducer = createV1CustomerSlice.reducer