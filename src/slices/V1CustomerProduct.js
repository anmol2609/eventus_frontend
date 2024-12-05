import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  V1_customer_product: {},
  V1_customer_products: [],
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
};

const V1CustomerProductSlice = createSlice({
  name: 'V1CustomerProduct',
  initialState,
  reducers: {
    // Create V1 Customer Product
    createV1CustomerProductRequest: (state) => {
      state.loading = true;
    },
    createV1CustomerProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.V1_customer_product = action.payload;
    },
    createV1CustomerProductFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get V1 Customer Product For Customer
    getV1CustomerProductForCustomerRequest: (state) => {
      state.loading = true;
    },
    getV1CustomerProductForCustomerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.V1_customer_products = action.payload;
    },
    getV1CustomerProductForCustomerFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get Single V1 Customer Product
    getV1CustomerProductRequest: (state) => {
      state.loading = true;
    },
    getV1CustomerProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.V1_customer_product = action.payload;
    },
    getV1CustomerProductFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Update V1 Customer Product
    updateV1CustomerProductRequest: (state) => {
      state.loading = true;
    },
    updateV1CustomerProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.V1_customer_product = action.payload;
    },
    updateV1CustomerProductFail: (state, action) => {
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
  createV1CustomerProductRequest,
  createV1CustomerProductSuccess,
  createV1CustomerProductFail,
  getV1CustomerProductForCustomerRequest,
  getV1CustomerProductForCustomerSuccess,
  getV1CustomerProductForCustomerFail,
  getV1CustomerProductRequest,
  getV1CustomerProductSuccess,
  getV1CustomerProductFail,
  updateV1CustomerProductRequest,
  updateV1CustomerProductSuccess,
  updateV1CustomerProductFail,
  clearErrors,
} = V1CustomerProductSlice.actions;

export default V1CustomerProductSlice.reducer;
