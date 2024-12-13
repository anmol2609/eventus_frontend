import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateV1Customer = createAsyncThunk(
  'updateV1Customer',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/v1_customer/${id}/update`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateV1CustomerSlice = createSlice({
    name: 'updateV1Customer',
    initialState: { 
      V1_customer: {}, 
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
      .addCase(updateV1Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer = action.payload
      })
      .addCase(updateV1Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateV1CustomerSlice.actions
export const updateV1CustomerReducer = updateV1CustomerSlice.reducer