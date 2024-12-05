import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  V1_customer: {},
  V1_customers: [],
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
};

const V1CustomerSlice = createSlice({
  name: 'V1Customer',
  initialState,
  reducers: {
    // Create V1 Customer
    createV1CustomerRequest: (state) => {
      state.loading = true;
    },
    createV1CustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.V1_customer = action.payload;
    },
    createV1CustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get All V1 Customers, Filter, Search
    getAllV1CustomersRequest: (state) => {
      state.loading = true;
    },
    getAllV1CustomersSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.V1_customers = action.payload;
    },
    getAllV1CustomersFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get Single V1 Customer
    getV1CustomerRequest: (state) => {
      state.loading = true;
    },
    getV1CustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.V1_customer = action.payload;
    },
    getV1CustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Update V1 Customer
    updateV1CustomerRequest: (state) => {
      state.loading = true;
    },
    updateV1CustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.V1_customer = action.payload;
    },
    updateV1CustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = false;
      state.error = action.payload;
    },

    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
      state.isUpdated = false;
    },
  },
});

// Export actions and reducer
export const {
  createV1CustomerRequest,
  createV1CustomerSuccess,
  createV1CustomerFail,
  getAllV1CustomersRequest,
  getAllV1CustomersSuccess,
  getAllV1CustomersFail,
  getV1CustomerRequest,
  getV1CustomerSuccess,
  getV1CustomerFail,
  updateV1CustomerRequest,
  updateV1CustomerSuccess,
  updateV1CustomerFail,
  clearErrors,
} = V1CustomerSlice.actions;

export default V1CustomerSlice.reducer;
