import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getV1CustomerProductForCustomer = createAsyncThunk(
  'getV1CustomerProductForCustomer',
  async (customer_id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(
        `/v1_customer_product/${customer_id}/customer`,
      )
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getV1CustomerProductForCustomerSlice = createSlice({
    name: 'getV1CustomerProductForCustomer',
    initialState: { 
      V1_customer_product: {}, 
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
      .addCase(getV1CustomerProductForCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(getV1CustomerProductForCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.V1_customer_product = action.payload
      })
      .addCase(getV1CustomerProductForCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getV1CustomerProductForCustomerSlice.actions
export const getV1CustomerProductForCustomerReducer = getV1CustomerProductForCustomerSlice.reducer