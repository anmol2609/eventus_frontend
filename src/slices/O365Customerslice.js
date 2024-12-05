import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  O365_customer: null,
  O365_customers: [],
  loading: false,
  success: false,
  isUpdated: false,
  error: null,
};

const O365CustomerSlice = createSlice({
  name: 'O365Customer',
  initialState,
  reducers: {
    // Create O365 Customer
    createO365CustomerRequest: (state) => {
      state.loading = true;
    },
    createO365CustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.O365_customer = action.payload;
    },
    createO365CustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get all O365 Customers, filter and search requests
    getAllO365CustomersRequest: (state) => {
      state.loading = true;
    },
    getAllO365CustomersSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.O365_customers = action.payload;
    },
    getAllO365CustomersFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get a specific O365 Customer
    getO365CustomerRequest: (state) => {
      state.loading = true;
    },
    getO365CustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.O365_customer = action.payload;
    },
    getO365CustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Update O365 Customer
    updateO365CustomerRequest: (state) => {
      state.loading = true;
    },
    updateO365CustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.O365_customer = action.payload;
    },
    updateO365CustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = false;
      state.error = action.payload;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
      state.isUpdated = false;
    },
  },
});

// Export actions and reducer
export const {
  createO365CustomerRequest,
  createO365CustomerSuccess,
  createO365CustomerFail,
  getAllO365CustomersRequest,
  getAllO365CustomersSuccess,
  getAllO365CustomersFail,
  getO365CustomerRequest,
  getO365CustomerSuccess,
  getO365CustomerFail,
  updateO365CustomerRequest,
  updateO365CustomerSuccess,
  updateO365CustomerFail,
  clearErrors,
} = O365CustomerSlice.actions;

export const O365CustomerSliceReducer = O365CustomerSlice.reducer;
