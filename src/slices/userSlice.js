import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Users Data
export const getAllUsersData = createAsyncThunk(
  'getUserList',
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
//async function for create User By Tenant
export const createUserByTenant = createAsyncThunk(
  'createUser',
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
//async function for update User By Tenant
export const updateUserByTenant = createAsyncThunk(
  'updateUser',
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
//async function for get User By Tenant
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
//async function for delete User Data
export const deleteUserData = createAsyncThunk(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      let obj = {
        "user_id": id
      }
      const { data } = await managementAxiosInstance.post(`/user/delete_user`,obj )
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
//async function for filter User Data
export const filterUserData = createAsyncThunk(
  'filterUser',
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
//async function for search User Data
export const searchUserData = createAsyncThunk(
  'searchUser',
  async (email, { rejectWithValue }) => {
    try {
      // Simulate an API call
      
      const { data } = await managementAxiosInstance.post(`/user/get_user_email`,{"user_email" : email})
      return data.user // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// Slice setup
const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userList: [],
    loading: false,
    success: false,
    error: null,
    deletedUserStatus: false, // flag to check if user deleted successfully  // Add other flags as needed for other user operations  // Add other user data properties as needed for other user operations  // Add other user reducers as needed for other user operations  // Add other user action creators as needed for other user operations  // Add other user thunks as needed for other user operations  // Add other user selectors as needed for other user operations  // Add other user sagas as needed
    createdUserStatus: false, 
    updatedUserStatus: false,
    userByTenant: null
  },
  reducers: {
    clearUserErrors: (state) => {
      state.error = null
      state.success = false
      state.deletedUserStatus = false
      state.createdUserStatus = false
      state.userByTenant = null
    },
  },
  extraReducers: (builder) => {
    builder
      //get users 
      .addCase(getAllUsersData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        
        state.loading = false
        state.success = true
        state.userList = action.payload
      })
      .addCase(getAllUsersData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
      //Search user 
      .addCase(searchUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(searchUserData.fulfilled, (state, action) => {
        
        state.loading = false
        state.success = true
        state.userList = action.payload
      })
      .addCase(searchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //filter user using filters
      .addCase(filterUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(filterUserData.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.userList = action.payload
      })
      .addCase(filterUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      //create User By Tenant
      .addCase(createUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(createUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.createdUserStatus = true
        state.success = true
      })
      .addCase(createUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })

      //update User By Tenant
      .addCase(updateUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.updatedUserStatus = true
        state.success = true
      })
      .addCase(updateUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })

      //delete user using id
      .addCase(deleteUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUserData.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.deletedUserStatus = true
      })
      .addCase(deleteUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    //get User By Tenant 
      .addCase(getUserByTenant.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserByTenant.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.userByTenant = action.payload
      })
      .addCase(getUserByTenant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearUserErrors } = userSlice.actions
export const userSliceReducer = userSlice.reducer

