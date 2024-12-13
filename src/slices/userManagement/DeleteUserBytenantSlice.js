import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
//async function for create User By Tenant
export const deleteUserByTenant = createAsyncThunk(
    'deleteUserByTenant',
    async (id, { rejectWithValue }) => {
      try {
        // Simulate an API call
        let obj = {
          "user_id": id
        }
        const { data } = await managementAxiosInstance.delete(`/user/delete_user`,obj )
        console.log(data,"deleteUserByTenant")
        return data // Return product data on success
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    },
  )
// AWS Customer Create Slice
const deleteUserByTenantSlice = createSlice({
    name: 'deleteUserByTenant',
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
      .addCase(deleteUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deleteUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
    }
  })
export const { clearErrors } = deleteUserByTenantSlice.actions
export const deleteUserByTenantReducer = deleteUserByTenantSlice.reducer