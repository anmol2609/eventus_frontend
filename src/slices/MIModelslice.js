// import { createSlice } from '@reduxjs/toolkit';

// const getMlModelSlice = createSlice({
//   name: 'mlModel',
//   initialState: { model: null, loading: false, success: false, error: null },
//   reducers: {
//     getMlModelRequest: (state) => {
//       state.loading = true;
//       state.success = false;
//       state.error = null;
//     },
//     getMlModelSuccess: (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.model = action.payload;
//     },
//     getMlModelFail: (state, action) => {
//       state.loading = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },
// });

// // Export actions
// export const { getMlModelRequest, getMlModelSuccess, getMlModelFail, clearErrors } = getMlModelSlice.actions;

// // Export the reducer
// export const mlModelReducer = getMlModelSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching the ML model
export const fetchMlModel = createAsyncThunk(
  'mlModel/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/ml-model'); // Replace with your actual API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const getMlModelSlice = createSlice({
  name: 'mlModel',
  initialState: { model: null, loading: false, success: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMlModel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchMlModel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.model = action.payload;
      })
      .addCase(fetchMlModel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearErrors } = getMlModelSlice.actions;

// Export the reducer
export const mlModelReducer = getMlModelSlice.reducer;
