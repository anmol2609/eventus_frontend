// import { createSlice } from '@reduxjs/toolkit';

// // Create SOAR Customer Slice
// export const createSOARCustomerSlice = createSlice({
//   name: 'createSOARCustomer',
//   initialState: {
//     customer: {},
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {
//     createSOARCustomerRequest: (state) => {
//       state.loading = true;
//     },
//     createSOARCustomerSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.customer = action.payload;
//     },
//     createSOARCustomerFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//     clearCreateErrors: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },
// });

// // Get All SOAR Customers Slice
// export const getAllSOARCustomersSlice = createSlice({
//   name: 'allSOARCustomers',
//   initialState: {
//     customers: [],
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {
//     getAllSOARCustomersRequest: (state) => {
//       state.loading = true;
//     },
//     getAllSOARCustomersSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.customers = action.payload;
//     },
//     getAllSOARCustomersFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//     clearAllCustomersErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// // Get Single SOAR Customer Slice
// export const getSOARCustomerSlice = createSlice({
//   name: 'SOARCustomer',
//   initialState: {
//     customer: null,
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {
//     getSOARCustomerRequest: (state) => {
//       state.loading = true;
//     },
//     getSOARCustomerSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.customer = action.payload;
//     },
//     getSOARCustomerFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//     clearCustomerErrors: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },
// });

// // Update SOAR Customer Slice
// export const updateSOARCustomerSlice = createSlice({
//   name: 'updateSOARCustomer',
//   initialState: {
//     customer: {},
//     loading: false,
//     success: false,
//     error: null,
//     isUpdated: false,
//   },
//   reducers: {
//     updateSOARCustomerRequest: (state) => {
//       state.loading = true;
//     },
//     updateSOARCustomerSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.isUpdated = true;
//       state.customer = action.payload;
//     },
//     updateSOARCustomerFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.isUpdated = false;
//       state.error = action.payload;
//     },
//     clearUpdateErrors: (state) => {
//       state.error = null;
//       state.isUpdated = false;
//       state.success = false;
//     },
//   },
// });

// // Export actions
// export const {
//   createSOARCustomerRequest,
//   createSOARCustomerSuccess,
//   createSOARCustomerFail,
//   clearCreateErrors,
// } = createSOARCustomerSlice.actions;

// export const {
//   getAllSOARCustomersRequest,
//   getAllSOARCustomersSuccess,
//   getAllSOARCustomersFail,
//   clearAllCustomersErrors,
// } = getAllSOARCustomersSlice.actions;

// export const {
//   getSOARCustomerRequest,
//   getSOARCustomerSuccess,
//   getSOARCustomerFail,
//   clearCustomerErrors,
// } = getSOARCustomerSlice.actions;

// export const {
//   updateSOARCustomerRequest,
//   updateSOARCustomerSuccess,
//   updateSOARCustomerFail,
//   clearUpdateErrors,
// } = updateSOARCustomerSlice.actions;

// // Export reducers
// export const createSOARCustomerReducer = createSOARCustomerSlice.reducer;
// export const getAllSOARCustomersReducer = getAllSOARCustomersSlice.reducer;
// export const getSOARCustomerReducer = getSOARCustomerSlice.reducer;
// export const updateSOARCustomerReducer = updateSOARCustomerSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const createSOARCustomer = createAsyncThunk(
  'createSOARCustomer/create',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/customers', customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllSOARCustomers = createAsyncThunk(
  'allSOARCustomers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSOARCustomer = createAsyncThunk(
  'SOARCustomer/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/customers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSOARCustomer = createAsyncThunk(
  'updateSOARCustomer/update',
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create SOAR Customer Slice
export const createSOARCustomerSlice = createSlice({
  name: 'createSOARCustomer',
  initialState: {
    customer: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearCreateErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSOARCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSOARCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customer = action.payload;
      })
      .addCase(createSOARCustomer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Get All SOAR Customers Slice
export const getAllSOARCustomersSlice = createSlice({
  name: 'allSOARCustomers',
  initialState: {
    customers: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearAllCustomersErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSOARCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSOARCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customers = action.payload;
      })
      .addCase(getAllSOARCustomers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Get Single SOAR Customer Slice
export const getSOARCustomerSlice = createSlice({
  name: 'SOARCustomer',
  initialState: {
    customer: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearCustomerErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSOARCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSOARCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customer = action.payload;
      })
      .addCase(getSOARCustomer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Update SOAR Customer Slice
export const updateSOARCustomerSlice = createSlice({
  name: 'updateSOARCustomer',
  initialState: {
    customer: {},
    loading: false,
    success: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    clearUpdateErrors: (state) => {
      state.error = null;
      state.isUpdated = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSOARCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSOARCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isUpdated = true;
        state.customer = action.payload;
      })
      .addCase(updateSOARCustomer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.isUpdated = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearCreateErrors } = createSOARCustomerSlice.actions;
export const { clearAllCustomersErrors } = getAllSOARCustomersSlice.actions;
export const { clearCustomerErrors } = getSOARCustomerSlice.actions;
export const { clearUpdateErrors } = updateSOARCustomerSlice.actions;

// Export reducers
export const createSOARCustomerReducer = createSOARCustomerSlice.reducer;
export const getAllSOARCustomersReducer = getAllSOARCustomersSlice.reducer;
export const getSOARCustomerReducer = getSOARCustomerSlice.reducer;
export const updateSOARCustomerReducer = updateSOARCustomerSlice.reducer;
