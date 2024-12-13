import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const updateMlModel = createAsyncThunk(
  'updateMlModel',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await mlModelAxiosInstance.put(`/ml_model/${payload.feed_id}/update`, payload.data)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const updateMlModelSlice = createSlice({
  name: 'updateMlModel',
  initialState: { 
    ml_model: {},
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
    .addCase(updateMlModel.pending, (state) => {
      state.loading = true
    })
    .addCase(updateMlModel.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.ml_model = action.payload // Save 
    })
    .addCase(updateMlModel.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})
export const { clearErrors } = updateMlModelSlice.actions
export const updateMlModelReducer = updateMlModelSlice.reducer