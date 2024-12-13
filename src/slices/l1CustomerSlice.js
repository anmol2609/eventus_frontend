import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getL1Customer = createAsyncThunk(
  'getL1Customer',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/tenancy_level?tenancy_level=L1`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

// Slice setup
const l1CustomersSlice = createSlice({
  name: 'l1CustomersSlice',
  initialState: {
    l1_customers: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearL1CustomersErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => { 
    builder
    //get All Data Centers
    .addCase(getL1Customer.pending, (state) => {
      state.loading = true
    })
    .addCase(getL1Customer.fulfilled, (state, action) => {
      
      state.loading = false
      state.success = true
      state.l1_customers = action.payload
    })
    .addCase(getL1Customer.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    
  },
})

export const { clearL1CustomersErrors } = l1CustomersSlice.actions
export const l1CustomersReducer = l1CustomersSlice.reducer

