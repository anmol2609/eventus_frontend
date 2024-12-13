import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateUserByTenant = createAsyncThunk(
  'updateUserByTenant',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/user/update_user`, payload)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// AWS Customer Create Slice
const updateUserByTenantSlice = createSlice({
    name: 'updateUserByTenant',
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
      .addCase(updateUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.user_by_tenant = action.payload
      })
      .addCase(updateUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateUserByTenantSlice.actions
export const updateUserByTenantReducer = updateUserByTenantSlice.reducer