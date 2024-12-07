import { createSlice } from '@reduxjs/toolkit'

// Create Customer Slice
const createCustomerSlice = createSlice({
  name: 'createCustomer',
  initialState: {
    customer: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    createCustomerRequest: (state) => {
      state.loading = true
    },
    createCustomerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.customer = action.payload
    },
    createCustomerFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearCreateErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
})

// Get All Customers Slice
const getAllCustomersSlice = createSlice({
  name: 'allCustomers',
  initialState: {
    users: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    getAllCustomersRequest: (state) => {
      state.loading = true
    },
    getAllCustomersSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.users = action.payload
    },
    getAllCustomersFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearAllCustomersErrors: (state) => {
      state.error = null
    },
  },
})

// Get Single Customer Slice
const getCustomerSlice = createSlice({
  name: 'customer',
  initialState: {
    customer: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    getCustomerRequest: (state) => {
      state.loading = true
    },
    getCustomerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.customer = action.payload
    },
    getCustomerFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearCustomerErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
})

// Update Customer Slice
const updateCustomerSlice = createSlice({
  name: 'updateCustomer',
  initialState: {
    customer: {},
    loading: false,
    success: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateCustomerRequest: (state) => {
      state.loading = true
    },
    updateCustomerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.isUpdated = true
      state.customer = action.payload
    },
    clearUpdateErrors: (state) => {
      state.error = null
      state.isUpdated = false
      state.success = false
    },
  },
})

// Export actions


// Customer Levels Slices
const createLevelSlice = (name) => {
  return createSlice({
    name: name,
    initialState: {
      customers: [],
      loading: false,
      success: false,
      error: null,
    },
    reducers: {
      getCustomerRequest: (state) => {
        state.loading = true
      },
      getCustomerSuccess: (state, action) => {
        state.loading = false
        state.success = true
        state.customers = action.payload
      },
      getCustomerFail: (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      },
      clearErrors: (state) => {
        state.error = null
        state.success = false
      },
    },
  })
}

const l0CustomerSlice = createLevelSlice('l0Customers')
const l1CustomerSlice = createLevelSlice('l1Customers')
const l2CustomerSlice = createLevelSlice('l2Customers')

// Export actions
export const {
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFail,
  clearCreateErrors,
} = createCustomerSlice.actions

export const {
  getAllCustomersRequest,
  getAllCustomersSuccess,
  getAllCustomersFail,
  clearAllCustomersErrors,
} = getAllCustomersSlice.actions

export const { getCustomerRequest, getCustomerSuccess, getCustomerFail, clearCustomerErrors } =
  getCustomerSlice.actions

  export const { updateCustomerRequest, updateCustomerSuccess, clearUpdateErrors } =
    updateCustomerSlice.actions




export const {
  getCustomerRequest: getL0CustomerRequest,
  getCustomerSuccess: getL0CustomerSuccess,
  getCustomerFail: getL0CustomerFail,
  clearErrors: clearL0Errors,
} = l0CustomerSlice.actions

export const {
  getCustomerRequest: getL1CustomerRequest,
  getCustomerSuccess: getL1CustomerSuccess,
  getCustomerFail: getL1CustomerFail,
  clearErrors: clearL1Errors,
} = l1CustomerSlice.actions

export const {
  getCustomerRequest: getL2CustomerRequest,
  getCustomerSuccess: getL2CustomerSuccess,
  getCustomerFail: getL2CustomerFail,
  clearErrors: clearL2Errors,
} = l2CustomerSlice.actions

// Export reducers
export const createCustomerReducer = createCustomerSlice.reducer
export const getAllCustomersReducer = getAllCustomersSlice.reducer
export const getCustomerReducer = getCustomerSlice.reducer
export const updateCustomerReducer = updateCustomerSlice.reducer
export const l0CustomerReducer = l0CustomerSlice.reducer
export const l1CustomerReducer = l1CustomerSlice.reducer
export const l2CustomerReducer = l2CustomerSlice.reducer
