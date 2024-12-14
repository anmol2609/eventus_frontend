import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tiAxiosInstance } from 'src/config/Axios'
//async function for get All Customers
export const getAllMitre = createAsyncThunk(
  'getAllMitre',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get('/api/mitre')
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
// AWS Customer Create Slice
const getAllMitreSlice = createSlice({
  name: 'getAllMitre',
  initialState: { 
    mitres: {},
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
    .addCase(getAllMitre.pending, (state) => {
      state.loading = true
    })
    .addCase(getAllMitre.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.mitres = action.payload // Save 
    })
    .addCase(getAllMitre.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})
export const { clearErrors } = getAllMitreSlice.actions
export const getAllMitreReducer = getAllMitreSlice.reducer