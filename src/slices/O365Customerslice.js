// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   O365_customer: null,
//   O365_customers: [],
//   loading: false,
//   success: false,
//   isUpdated: false,
//   error: null,
// };

// const O365CustomerSlice = createSlice({
//   name: 'O365Customer',
//   initialState,
//   reducers: {
//     // Create O365 Customer
//     createO365CustomerRequest: (state) => {
//       state.loading = true;
//     },
//     createO365CustomerSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.O365_customer = action.payload;
//     },
//     createO365CustomerFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },

//     // Get all O365 Customers, filter and search requests
//     getAllO365CustomersRequest: (state) => {
//       state.loading = true;
//     },
//     getAllO365CustomersSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.O365_customers = action.payload;
//     },
//     getAllO365CustomersFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },

//     // Get a specific O365 Customer
//     getO365CustomerRequest: (state) => {
//       state.loading = true;
//     },
//     getO365CustomerSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.O365_customer = action.payload;
//     },
//     getO365CustomerFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },

//     // Update O365 Customer
//     updateO365CustomerRequest: (state) => {
//       state.loading = true;
//     },
//     updateO365CustomerSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.isUpdated = true;
//       state.O365_customer = action.payload;
//     },
//     updateO365CustomerFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.isUpdated = false;
//       state.error = action.payload;
//     },

//     // Clear errors
//     clearErrors: (state) => {
//       state.error = null;
//       state.success = false;
//       state.isUpdated = false;
//     },
//   },
// });

// // Export actions and reducer
// export const {
//   createO365CustomerRequest,
//   createO365CustomerSuccess,
//   createO365CustomerFail,
//   getAllO365CustomersRequest,
//   getAllO365CustomersSuccess,
//   getAllO365CustomersFail,
//   getO365CustomerRequest,
//   getO365CustomerSuccess,
//   getO365CustomerFail,
//   updateO365CustomerRequest,
//   updateO365CustomerSuccess,
//   updateO365CustomerFail,
//   clearErrors,
// } = O365CustomerSlice.actions;

// export const O365CustomerSliceReducer = O365CustomerSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  O365_customer: null,
  O365_customers: [],
  loading: false,
  success: false,
  isUpdated: false,
  error: null,
};

// Async Thunks
export const createO365Customer = createAsyncThunk(
  'O365Customer/create',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/o365-customers', customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllO365Customers = createAsyncThunk(
  'O365Customer/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/o365-customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getO365Customer = createAsyncThunk(
  'O365Customer/get',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/o365-customers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateO365Customer = createAsyncThunk(
  'O365Customer/update',
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/o365-customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const O365CustomerSlice = createSlice({
  name: 'O365Customer',
  initialState,
  reducers: {
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    // Create O365 Customer
    builder
      .addCase(createO365Customer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createO365Customer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.O365_customer = action.payload;
      })
      .addCase(createO365Customer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // Get All O365 Customers
    builder
      .addCase(getAllO365Customers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllO365Customers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.O365_customers = action.payload;
      })
      .addCase(getAllO365Customers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // Get Specific O365 Customer
    builder
      .addCase(getO365Customer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getO365Customer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.O365_customer = action.payload;
      })
      .addCase(getO365Customer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // Update O365 Customer
    builder
      .addCase(updateO365Customer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateO365Customer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isUpdated = true;
        state.O365_customer = action.payload;
      })
      .addCase(updateO365Customer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.isUpdated = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearErrors } = O365CustomerSlice.actions;
export const O365CustomerSliceReducer = O365CustomerSlice.reducer;
