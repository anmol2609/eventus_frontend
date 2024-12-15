import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getL0Customer = createAsyncThunk(
  'getL0Customer',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/all`)
      //const { data } = await managementAxiosInstance.get(`/user/tenancy_level?tenancy_level=L0`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)

// Slice setup
const l0CustomersSlice = createSlice({
  name: 'l0CustomersSlice',
  initialState: {
    l0_customers: [],
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
    .addCase(getL0Customer.pending, (state) => {
      state.loading = true
    })
    .addCase(getL0Customer.fulfilled, (state, action) => {
      
      state.loading = false
      state.success = true
      state.l0_customers = action.payload
    })
    .addCase(getL0Customer.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    
  },
})

export const { clearL0CustomersErrors } = l0CustomersSlice.actions
export const l0CustomersReducer = l0CustomersSlice.reducer

