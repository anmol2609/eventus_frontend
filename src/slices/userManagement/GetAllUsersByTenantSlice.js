import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getUsersByTenant = createAsyncThunk(
  'getUsersByTenant',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/list_user`)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const searchUsersByTenant = createAsyncThunk(
  'searchUsersByTenant',
  async (email, { rejectWithValue }) => {
    try {
      // Simulate an API call
      
      const { data } = await managementAxiosInstance.post(`/user/get_user_email`,{"user_email" : email})
      return data.users // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const filterUsersByTenant = createAsyncThunk(
  'filterUsersByTenant',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call
      
      const { data } = await managementAxiosInstance.post(`/user/filter_users`,filters )
      return data.users // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// AWS Customer Create Slice
const getUsersByTenantSlice = createSlice({
    name: 'getUsersByTenant',
    initialState: { 
      users_by_tenant : [], 
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
      .addCase(getUsersByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsersByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.users_by_tenant = action.payload
      })
      .addCase(getUsersByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchUsersByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(searchUsersByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.users_by_tenant = action.payload
      })
      .addCase(searchUsersByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(filterUsersByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(filterUsersByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.users_by_tenant = action.payload
      })
      .addCase(filterUsersByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors:clearUserByTenantErrors } = getUsersByTenantSlice.actions
export const getUsersByTenantReducer = getUsersByTenantSlice.reducer