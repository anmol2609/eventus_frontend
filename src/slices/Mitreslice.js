// import { createSlice } from '@reduxjs/toolkit'

// const getMitreSlice = createSlice({
//   name: 'getMitre',
//   initialState: { mitre: [], loading: false, success: false, error: null },
//   reducers: {
//     getAllMitreRequests: (state) => {
//       state.loading = true
//     },
//     getAllMitreSuccess: (state, action) => {
//       state.loading = false
//       state.success = true
//       state.mitre = action.payload
//     },
//     getAllMitreFail: (state, action) => {
//       state.loading = false
//       state.success = false
//       state.error = action.payload
//     },
//     clearErrors: (state) => {
//       state.error = null
//     }
//   }
// })

// // Export actions and reducer
// export const { getAllMitreRequests, getAllMitreSuccess, getAllMitreFail, clearErrors } = getMitreSlice.actions
// export const mitreReducer = getMitreSlice.reducer  // <-- Updated export
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching Mitre data
export const fetchAllMitre = createAsyncThunk(
  'getMitre/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/mitre');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getMitreSlice = createSlice({
  name: 'getMitre',
  initialState: { mitre: [], loading: false, success: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMitre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMitre.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.mitre = action.payload;
      })
      .addCase(fetchAllMitre.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearErrors } = getMitreSlice.actions;
export const mitreReducer = getMitreSlice.reducer;
