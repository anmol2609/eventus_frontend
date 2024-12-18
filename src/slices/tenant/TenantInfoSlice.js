import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
// Make async functions for API calls, replace with real API calls in your app

export const getTenantInfo = createAsyncThunk(
  'getTenantInfo',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      console.log(payload)
      const { data } = await managementAxiosInstance.get(`/tenants/info?tenancy_level=${payload.tenancy_level}&tenant_code=${payload.tenant_code}`)
      
      return data.tenants // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

// Slice setup
const getTenantInfoSlice = createSlice({
  name: 'getTenantInfo',
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
      .addCase(getTenantInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(getTenantInfo.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.tenants = action.payload
      })
      .addCase(getTenantInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearTenantErrors } = getTenantInfoSlice.actions
export const getTenantInfoReducer = getTenantInfoSlice.reducer

