import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const testArtifact = createAsyncThunk(
  'testArtifact',
  async (artifacts, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.post(`/artifact/test`, { artifacts })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const testArtifactSlice = createSlice({
    name: 'testArtifact',
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
      .addCase(testArtifact.pending, (state) => {
        state.loading = true
      })
      .addCase(testArtifact.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.artifact = action.payload
      })
      .addCase(testArtifact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    }
  })
export const { clearErrors } = testArtifactSlice.actions
export const testArtifactReducer = testArtifactSlice.reducer