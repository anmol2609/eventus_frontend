import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateO365Customer = createAsyncThunk(
  'updateO365Customer',
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/o365-customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// create O365 Customer Create Slice
const updateO365CustomerSlice = createSlice({
    name: 'updateO365Customer',
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
      .addCase(updateO365Customer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateO365Customer.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.O365_customer = action.payload // Save 
      })
      .addCase(updateO365Customer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateO365CustomerSlice.actions
export const updateO365CustomerReducer = updateO365CustomerSlice.reducer