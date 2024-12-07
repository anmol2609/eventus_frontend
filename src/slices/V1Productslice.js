import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  V1_product: {},
  V1_products: [],
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
}

const V1ProductSlice = createSlice({
  name: 'V1Product',
  initialState,
  reducers: {
    createV1ProductRequest: (state) => {
      state.loading = true
    },
    createV1ProductSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.V1_product = action.payload
    },
    createV1ProductFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },

    getAllV1ProductsRequest: (state) => {
      state.loading = true
    },
    getAllV1ProductsSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.V1_products = action.payload
    },
    getAllV1ProductsFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },


    getV1ProductRequest: (state) => {
      state.loading = true
    },
    getV1ProductSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.V1_product = action.payload
    },
    getV1ProductFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },

    // Update V1 Product
    updateV1ProductRequest: (state) => {
      state.loading = true
    },
    updateV1ProductSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.isUpdated = true
      state.V1_product = action.payload
    },
    updateV1ProductFail: (state, action) => {
      state.loading = false
      state.success = false
      state.isUpdated = false
      state.error = action.payload
    },


    clearErrors: (state) => {
      state.error = null
      state.success = false
      state.isUpdated = false
    },
  },
})


export const {
  createV1ProductRequest,
  createV1ProductSuccess,
  createV1ProductFail,
  getAllV1ProductsRequest,
  getAllV1ProductsSuccess,
  getAllV1ProductsFail,
  getV1ProductRequest,
  getV1ProductSuccess,
  getV1ProductFail,
  updateV1ProductRequest,
  updateV1ProductSuccess,
  updateV1ProductFail,
  clearErrors,
} = V1ProductSlice.actions

// Export reducer
export default V1ProductSlice.reducer
