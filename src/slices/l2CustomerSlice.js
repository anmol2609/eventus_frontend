import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getL2Customer = createAsyncThunk(
  'getL2Customer',
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
const l2CustomersSlice = createSlice({
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
    .addCase(getL2Customer.pending, (state) => {
      state.loading = true
    })
    .addCase(getL2Customer.fulfilled, (state, action) => {
      
      state.loading = false
      state.success = true
      state.l2_customers = action.payload
    })
    .addCase(getL2Customer.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    
  },
})

export const { clearL2CustomersErrors } = l2CustomersSlice.actions
export const l2CustomersReducer = l2CustomersSlice.reducer

