import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tiAxiosInstance } from 'src/config/Axios'
export const getAllTags = createAsyncThunk(
  'getAllTags',
  async (feed_id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await tiAxiosInstance.get(`/tags/${feed_id}/all`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
const tagsSlice = createSlice({
  name: 'tags',
  initialState : {
    tags: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllTags.pending, (state) => {
      state.loading = true
    })
    .addCase(getAllTags.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.tags = action.payload
    })
    .addCase(getAllTags.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
});

// Export actions
export const {
  clearErrors: clearTagsErrors,
} = tagsSlice.actions;

// Export reducer
export const tagsReducer = tagsSlice.reducer;
