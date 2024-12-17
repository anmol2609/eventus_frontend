import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllO365Customers = createAsyncThunk(
  'getAllO365Customers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await managementAxiosInstance.get('/api/o365-customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const searchO365Customer = createAsyncThunk(
  'searchO365Customer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await managementAxiosInstance.get('/api/o365-customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const filterO365Customer = createAsyncThunk(
  'filterO365Customer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await managementAxiosInstance.get('/api/o365-customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// create O365 Customer Create Slice
const getAllO365CustomersSlice = createSlice({
    name: 'getAllO365Customers',
    initialState: { 
      O365_customers: [],
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
      .addCase(getAllO365Customers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllO365Customers.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.O365_customers = action.payload // Save 
      })
      .addCase(getAllO365Customers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchO365Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(searchO365Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.O365_customers = action.payload // Save 
      })
      .addCase(searchO365Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterO365Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(filterO365Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.O365_customers = action.payload // Save 
      })
      .addCase(filterO365Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getAllO365CustomersSlice.actions
export const getAllO365CustomersReducer = getAllO365CustomersSlice.reducer