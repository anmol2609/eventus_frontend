import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getO365Customer = createAsyncThunk(
  'getO365Customer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await managementAxiosInstance.get(`/api/o365-customers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// create O365 Customer Create Slice
const getO365CustomerSlice = createSlice({
    name: 'getO365Customer',
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
      .addCase(getO365Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(getO365Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.O365_customer = action.payload // Save 
      })
      .addCase(getO365Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getO365CustomerSlice.actions
export const getO365CustomerReducer = getO365CustomerSlice.reducer