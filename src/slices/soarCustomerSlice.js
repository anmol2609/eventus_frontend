import { createSlice } from '@reduxjs/toolkit';

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
    createSOARCustomerRequest: (state) => {
      state.loading = true;
    },
    createSOARCustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.customer = action.payload;
    },
    createSOARCustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearCreateErrors: (state) => {
      state.error = null;
      state.success = false;
    },
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
    getAllSOARCustomersRequest: (state) => {
      state.loading = true;
    },
    getAllSOARCustomersSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.customers = action.payload;
    },
    getAllSOARCustomersFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearAllCustomersErrors: (state) => {
      state.error = null;
    },
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
    getSOARCustomerRequest: (state) => {
      state.loading = true;
    },
    getSOARCustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.customer = action.payload;
    },
    getSOARCustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearCustomerErrors: (state) => {
      state.error = null;
      state.success = false;
    },
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
    updateSOARCustomerRequest: (state) => {
      state.loading = true;
    },
    updateSOARCustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.customer = action.payload;
    },
    updateSOARCustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    clearUpdateErrors: (state) => {
      state.error = null;
      state.isUpdated = false;
      state.success = false;
    },
  },
});

// Export actions
export const {
  createSOARCustomerRequest,
  createSOARCustomerSuccess,
  createSOARCustomerFail,
  clearCreateErrors,
} = createSOARCustomerSlice.actions;

export const {
  getAllSOARCustomersRequest,
  getAllSOARCustomersSuccess,
  getAllSOARCustomersFail,
  clearAllCustomersErrors,
} = getAllSOARCustomersSlice.actions;

export const {
  getSOARCustomerRequest,
  getSOARCustomerSuccess,
  getSOARCustomerFail,
  clearCustomerErrors,
} = getSOARCustomerSlice.actions;

export const {
  updateSOARCustomerRequest,
  updateSOARCustomerSuccess,
  updateSOARCustomerFail,
  clearUpdateErrors,
} = updateSOARCustomerSlice.actions;

// Export reducers
export const createSOARCustomerReducer = createSOARCustomerSlice.reducer;
export const getAllSOARCustomersReducer = getAllSOARCustomersSlice.reducer;
export const getSOARCustomerReducer = getSOARCustomerSlice.reducer;
export const updateSOARCustomerReducer = updateSOARCustomerSlice.reducer;
