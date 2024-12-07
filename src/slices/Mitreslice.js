import { createSlice } from '@reduxjs/toolkit'

const getMitreSlice = createSlice({
  name: 'getMitre',
  initialState: { mitre: [], loading: false, success: false, error: null },
  reducers: {
    getAllMitreRequests: (state) => {
      state.loading = true
    },
    getAllMitreSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.mitre = action.payload
    },
    getAllMitreFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    }
  }
})

// Export actions and reducer
export const { getAllMitreRequests, getAllMitreSuccess, getAllMitreFail, clearErrors } = getMitreSlice.actions
export const mitreReducer = getMitreSlice.reducer  // <-- Updated export

//Commit