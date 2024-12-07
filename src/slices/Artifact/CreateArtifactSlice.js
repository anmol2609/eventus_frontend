import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const createArtifact = createAsyncThunk(
  'createArtifact',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.post(`/artifact/new`, payload)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const createArtifactSlice = createSlice({
  name: 'createArtifact',
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
    .addCase(createArtifact.pending, (state) => {
      state.loading = true
    })
    .addCase(createArtifact.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.artifact = action.payload // Save 
    })
    .addCase(createArtifact.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})
export const { clearErrors } = createArtifactSlice.actions
export const createArtifactReducer = createArtifactSlice.reducer