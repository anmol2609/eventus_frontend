import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getUserDetailsBySessionId = createAsyncThunk(
  'getUserDetailsBySessionId',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/user/get_user_detail?session_id=`+id);
      let parsed_data = JSON.parse(data.response_data)
      return parsed_data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// AWS Customer Create Slice
const getUserDetailsBySessionIdSlice = createSlice({
    name: 'getUserDetailsBySessionId',
    initialState: { 
      user_detail: null, 
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
      .addCase(getUserDetailsBySessionId.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserDetailsBySessionId.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.user_detail = action.payload
      })
      .addCase(getUserDetailsBySessionId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors:cleargetUserDetailsBySessionIdError } = getUserDetailsBySessionIdSlice.actions
export const getUserDetailsBySessionIdReducer = getUserDetailsBySessionIdSlice.reducer