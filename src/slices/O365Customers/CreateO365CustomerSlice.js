import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createO365Customer = createAsyncThunk(
  'createO365Customer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await managementAxiosInstance.post('/api/o365-customers', customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// create O365 Customer Create Slice
const createO365CustomerSlice = createSlice({
    name: 'createO365Customer',
    initialState: { 
      O365_customer: {},
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
      .addCase(createO365Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(createO365Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.O365_customer = action.payload // Save 
      })
      .addCase(createO365Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = createO365CustomerSlice.actions
export const createO365CustomerReducer = createO365CustomerSlice.reducer