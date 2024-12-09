import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateArtifact = createAsyncThunk(
  'updateArtifact',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.put(`/aws_customer/${payload.id}/update`, payload.user)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateArtifactSlice = createSlice({
    name: 'updateArtifact',
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
      .addCase(updateArtifact.pending, (state) => {
        state.loading = true
      })
      .addCase(updateArtifact.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifact = action.payload
      })
      .addCase(updateArtifact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = updateArtifactSlice.actions
export const updateArtifactReducer = updateArtifactSlice.reducer