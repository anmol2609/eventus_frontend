import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
// Make async functions for API calls, replace with real API calls in your app

export const getTenantByTenancyLevel = createAsyncThunk(
  'getTenantByTenancyLevel',
  async (level, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/tenants/tenancy?tenancy_level=${level}`)
      
      return data.users // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Slice setup
const tenantsSlice = createSlice({
  name: 'tenantsSlice',
  initialState: {
    loading: false,
    success: false,
    error: null,
    tenants:[]
  },
  reducers: {
    clearTenantErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      //create User By Tenant
      .addCase(getTenantByTenancyLevel.pending, (state) => {
        state.loading = true
      })
      .addCase(getTenantByTenancyLevel.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.tenants = action.payload
      })
      .addCase(getTenantByTenancyLevel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearTenantErrors } = tenantsSlice.actions
export const tenantsSliceReducer = tenantsSlice.reducer

