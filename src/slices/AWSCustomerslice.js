import { createSlice } from '@reduxjs/toolkit'

// AWS Customer Create Slice
const awsCustomerCreateSlice = createSlice({
  name: 'awsCustomerCreate',
  initialState: { aws_customer: {}, loading: false, success: false, error: null },
  reducers: {
    awsCustomerCreateRequest: (state) => {
      state.loading = true
    },
    awsCustomerCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.aws_customer = action.payload
    },
    awsCustomerCreateFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    }
  }
})

// Get All AWS Customers Slice
const getAllAWSCustomersSlice = createSlice({
  name: 'getAllAWSCustomers',
  initialState: { aws_customers: [], loading: false, success: false, error: null },
  reducers: {
    awsCustomerRequest: (state) => {
      state.loading = true
    },
    awsCustomerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.aws_customers = action.payload
    },
    awsCustomerFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    }
  }
})

// Get Single AWS Customer Slice
const getAWSCustomerSlice = createSlice({
  name: 'getAWSCustomer',
  initialState: { aws_customer: null, loading: false, success: false, error: null },
  reducers: {
    getAWSCustomerRequest: (state) => {
      state.loading = true
    },
    getAWSCustomerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.aws_customer = action.payload
    },
    getAWSCustomerFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    }
  }
})

// Update AWS Customer Slice
const updateAWSCustomerSlice = createSlice({
  name: 'updateAWSCustomer',
  initialState: { aws_customer: {}, loading: false, success: false, isUpdated: false, error: null },
  reducers: {
    updateAWSCustomerRequest: (state) => {
      state.loading = true
    },
    updateAWSCustomerSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.isUpdated = true
      state.aws_customer = action.payload
    },
    updateAWSCustomerFail: (state, action) => {
      state.loading = false
      state.success = false
      state.isUpdated = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.isUpdated = false
      state.success = false
    }
  }
})

// Export actions and reducers for each slice
export const { awsCustomerCreateRequest, awsCustomerCreateSuccess, awsCustomerCreateFail, clearErrors: clearCreateErrors } = awsCustomerCreateSlice.actions
export const { awsCustomerRequest, awsCustomerSuccess, awsCustomerFail, clearErrors: clearAllErrors } = getAllAWSCustomersSlice.actions
export const { getAWSCustomerRequest, getAWSCustomerSuccess, getAWSCustomerFail, clearErrors: clearGetErrors } = getAWSCustomerSlice.actions
export const { updateAWSCustomerRequest, updateAWSCustomerSuccess, updateAWSCustomerFail, clearErrors: clearUpdateErrors } = updateAWSCustomerSlice.actions

export const awsCustomerCreateReducer = awsCustomerCreateSlice.reducer
export const getAllAWSCustomersReducer = getAllAWSCustomersSlice.reducer
export const getAWSCustomerReducer = getAWSCustomerSlice.reducer
export const updateAWSCustomerReducer = updateAWSCustomerSlice.reducer
