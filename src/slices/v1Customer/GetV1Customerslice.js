import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getV1Customer = createAsyncThunk(
  'getV1Customer',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/v1_customer/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getV1CustomerSlice = createSlice({
    name: 'getV1Customer',
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
      .addCase(getV1Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(getV1Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer = action.payload
      })
      .addCase(getV1Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getV1CustomerSlice.actions
export const getV1CustomerReducer = getV1CustomerSlice.reducer