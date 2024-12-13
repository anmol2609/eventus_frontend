import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getUserByTenant = createAsyncThunk(
  'getUserByTenant',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/get_user_by_id?user_id=${id}`)
      return data.user // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// AWS Customer Create Slice
const getUserByTenantSlice = createSlice({
    name: 'getUserByTenant',
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
      .addCase(getUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.user_by_tenant = action.payload
      })
      .addCase(getUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors:clearGetUserByTenantError } = getUserByTenantSlice.actions
export const getUserByTenantReducer = getUserByTenantSlice.reducer