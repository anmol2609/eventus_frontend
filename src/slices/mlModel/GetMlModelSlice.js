import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getMlModel = createAsyncThunk(
  'getMlModel',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await mlModelAxiosInstance.get(`/ml_model/${id}/get`)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getMlModelSlice = createSlice({
  name: 'getMlModel',
  initialState: { 
    model: {},
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
    .addCase(getMlModel.pending, (state) => {
      state.loading = true
    })
    .addCase(getMlModel.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.model = action.payload // Save 
    })
    .addCase(getMlModel.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})
export const { clearErrors } = getMlModelSlice.actions
export const getMlModelReducer = getMlModelSlice.reducer