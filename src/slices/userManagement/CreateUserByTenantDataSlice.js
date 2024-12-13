import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
//async function for create User By Tenant
export const createUserByTenant = createAsyncThunk(
  'createUserByTenant',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/user/create_user`, payload)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
) 
// AWS Customer Create Slice
const createUserByTenantSlice = createSlice({
    name: 'createUserByTenant',
    initialState: { 
      user_by_tenant: {},
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
      .addCase(createUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(createUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(createUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
    }
  })
export const { clearErrors } = createUserByTenantSlice.actions
export const createUserByTenantReducer = createUserByTenantSlice.reducer