import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getArtifact = createAsyncThunk(
  'getArtifact',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/aws_customer/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getArtifactSlice = createSlice({
    name: 'getArtifact',
    initialState: { 
      artifact: {}, 
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
      .addCase(getArtifact.pending, (state) => {
        state.loading = true
      })
      .addCase(getArtifact.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifact = action.payload
      })
      .addCase(getArtifact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = getArtifactSlice.actions
export const getArtifactReducer = getArtifactSlice.reducer