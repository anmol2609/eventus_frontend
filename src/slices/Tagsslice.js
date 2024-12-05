import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: {},
  loading: false,
  success: false,
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    // Get All Tags
    getAllTagsRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    getAllTagsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.tags = action.payload;
    },
    getAllTagsFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  getAllTagsRequest,
  getAllTagsSuccess,
  getAllTagsFail,
  clearErrors: clearTagsErrors,
} = tagsSlice.actions;

// Export reducer
export const tagsReducer = tagsSlice.reducer;
