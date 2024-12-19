import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { managementAxiosInstance } from 'src/config/Axios'
//async function for get All Data Centers Data
export const getAllDataCenters = createAsyncThunk(
  'getAllDataCenters',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/data_center/all`)

      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  },
)
//async function for create Data Center
export const createDataCenter = createAsyncThunk(
  'createDataCenter',
  async (payload, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.post(`/data_center/new`, payload)
      return data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)
//async function for update Data Center
export const updateDataCenter = createAsyncThunk(
  'updateDataCenter',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await managementAxiosInstance.put(`/data_center/${payload.id}/update`, payload.dataCenter)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

//async function for filter Data Center
export const filterDataCenter = createAsyncThunk(
  'filterDataCenter',
  async (filters, { rejectWithValue }) => {
    try {
      // Simulate an API call

      const { data } = await managementAxiosInstance.get(`/data_center/filter`, {
        params: filters,
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)
//async function for search User Data
export const searchDataCenter = createAsyncThunk(
  'searchDataCenter',
  async (term, { rejectWithValue }) => {
    try {
      // Simulate an API call

      const { data } = await managementAxiosInstance.get(`/data_center/search`, {
        params: { term },
      })
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message) //
    }
  },
)

//async function for search User Data
export const getDataCenter = createAsyncThunk(
  'getDataCenter',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate an API call
      const { data } = await managementAxiosInstance.get(`/data_center/${id}/get`)
      return data.data // Return product data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message) //
    }
  },
)
// Slice setup
const dataCenterSlice = createSlice({
  name: 'dataCenterSlice',
  initialState: {
    data_centers: [],
    loading: false,
    success: false,
    error: null,
    createdDataCenterStatus: false,
    updatedDataCenterStatus: false,
    fetch_data_center_status:false,
    data_center: {}
  },
  reducers: {
    clearDataCenterErrors: (state) => {
      state.error = null
      state.success = false
      state.updatedDataCenterStatus = false
      state.createdDataCenterStatus = false
      state.fetch_data_center_status = false
    },
  },
  extraReducers: (builder) => {
    builder
      //get All Data Centers
      .addCase(getAllDataCenters.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllDataCenters.fulfilled, (state, action) => {

        state.loading = false
        state.success = true
        state.data_centers = action.payload
      })
      .addCase(getAllDataCenters.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //search Data Center
      .addCase(searchDataCenter.pending, (state) => {
        state.loading = true
      })
      .addCase(searchDataCenter.fulfilled, (state, action) => {

        state.loading = false
        state.success = true
        state.userList = action.payload
      })
      .addCase(searchDataCenter.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //filter Data Center
      .addCase(filterDataCenter.pending, (state) => {
        state.loading = true
      })
      .addCase(filterDataCenter.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.userList = action.payload
      })
      .addCase(filterDataCenter.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      //create Data Center
      .addCase(createDataCenter.pending, (state) => {
        state.loading = true
      })
      .addCase(createDataCenter.fulfilled, (state, action) => {
        state.loading = false
        state.createdDataCenterStatus = true
        state.success = true
      })
      .addCase(createDataCenter.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })

      //update Data Center
      .addCase(updateDataCenter.pending, (state) => {
        state.loading = true
      })
      .addCase(updateDataCenter.fulfilled, (state, action) => {
        state.loading = false
        state.updatedDataCenterStatus = true
        state.success = true
      })
      .addCase(updateDataCenter.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    //get User By Tenant
      .addCase(getDataCenter.pending, (state) => {
        state.loading = true
      })
      .addCase(getDataCenter.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.fetch_data_center_status = true
        state.data_center = action.payload
      })
      .addCase(getDataCenter.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export const { clearDataCenterErrors } = dataCenterSlice.actions
export const dataCenterReducer = dataCenterSlice.reducer

