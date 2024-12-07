import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getL3Customer = createAsyncThunk(
  'getL3Customer',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

// Slice setup
const l3CustomersSlice = createSlice({
  name: 'l2CustomersSlice',
  initialState: {
    l2_customers: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearL0CustomersErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => { 
    builder
    //get All Data Centers
    .addCase(getL3Customer.pending, (state) => {
      state.loading = true
    })
    .addCase(getL3Customer.fulfilled, (state, action) => {
      
      state.loading = false
      state.success = true
      state.l2_customers = action.payload
    })
    .addCase(getL3Customer.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    
  },
})

export const { clearL2CustomersErrors } = l3CustomersSlice.actions
export const l3CustomersReducer = l3CustomersSlice.reducer

