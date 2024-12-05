import { createSlice } from '@reduxjs/toolkit';

const getMlModelSlice = createSlice({
  name: 'mlModel',
  initialState: { model: null, loading: false, success: false, error: null },
  reducers: {
    getMlModelRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    getMlModelSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.model = action.payload;
    },
    getMlModelFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
});

// Export actions
export const { getMlModelRequest, getMlModelSuccess, getMlModelFail, clearErrors } = getMlModelSlice.actions;

// Export the reducer
export const mlModelReducer = getMlModelSlice.reducer;
