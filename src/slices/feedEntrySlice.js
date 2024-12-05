import { createSlice } from '@reduxjs/toolkit'

// Slice for creating a new feed entry
const createFeedEntrySlice = createSlice({
  name: 'createFeedEntry',
  initialState: { feed_entry: {}, loading: false, success: false, error: null },
  reducers: {
    feedEntryCreateRequest: (state) => {
      state.loading = true
    },
    feedEntryCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.feed_entry = action.payload
    },
    feedEntryCreateFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
})

// Slice for getting all feed entries
const getAllFeedEntriesSlice = createSlice({
  name: 'getAllFeedEntries',
  initialState: { feed_entries: [], loading: false, success: false, error: null },
  reducers: {
    getAllFeedEntriesRequest: (state) => {
      state.loading = true
    },
    getAllFeedEntriesSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.feed_entries = action.payload
    },
    getAllFeedEntriesFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    filterFeedEntryRequest: (state) => {
      state.loading = true
    },
    filterFeedEntrySuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.feed_entries = action.payload
    },
    filterFeedEntryFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    searchFeedEntryRequest: (state) => {
      state.loading = true
    },
    searchFeedEntrySuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.feed_entries = action.payload
    },
    searchFeedEntryFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    },
  },
})

// Slice for getting approved feed entries
const getApprovedFeedEntriesSlice = createSlice({
  name: 'getApprovedFeedEntries',
  initialState: { approved_feed_entries: [], loading: false, success: false, error: null },
  reducers: {
    getApprovedFeedEntriesRequest: (state) => {
      state.loading = true
    },
    getApprovedFeedEntriesSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.approved_feed_entries = action.payload
    },
    getApprovedFeedEntriesFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    },
  },
})

// Slice for getting completed feed entries
const getCompletedFeedEntriesSlice = createSlice({
  name: 'getCompletedFeedEntries',
  initialState: { completed_feed_entries: [], loading: false, success: false, error: null },
  reducers: {
    getCompletedFeedEntriesRequest: (state) => {
      state.loading = true
    },
    getCompletedFeedEntriesSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.completed_feed_entries = action.payload
    },
    getCompletedFeedEntriesFail: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    },
  },
})

// Slice for getting a single feed entry
const getFeedEntrySlice = createSlice({
  name: 'getFeedEntry',
  initialState: { feed_entry: {}, loading: false, error: null },
  reducers: {
    getFeedEntryRequest: (state) => {
      state.loading = true
    },
    getFeedEntrySuccess: (state, action) => {
      state.loading = false
      state.feed_entry = action.payload
    },
    getFeedEntryFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
    },
  },
})

// Slice for updating a feed entry
const updateFeedEntrySlice = createSlice({
  name: 'updateFeedEntry',
  initialState: { success: false, loading: false, error: null },
  reducers: {
    updateFeedEntryRequest: (state) => {
      state.loading = true
    },
    updateFeedEntrySuccess: (state) => {
      state.loading = false
      state.success = true
    },
    updateFeedEntryFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearErrors: (state) => {
      state.error = null
      state.success = false
    },
  },
})

// Export actions and reducers
export const createFeedEntryActions = createFeedEntrySlice.actions
export const getAllFeedEntriesActions = getAllFeedEntriesSlice.actions
export const getApprovedFeedEntriesActions = getApprovedFeedEntriesSlice.actions
export const getCompletedFeedEntriesActions = getCompletedFeedEntriesSlice.actions
export const getFeedEntryActions = getFeedEntrySlice.actions
export const updateFeedEntryActions = updateFeedEntrySlice.actions
export const { clearErrors, createFeedEntry } = createFeedEntrySlice.actions
export const createFeedEntryReducer = createFeedEntrySlice.reducer
export const getAllFeedEntriesReducer = getAllFeedEntriesSlice.reducer
export const getApprovedFeedEntriesReducer = getApprovedFeedEntriesSlice.reducer
export const getCompletedFeedEntriesReducer = getCompletedFeedEntriesSlice.reducer
export const getFeedEntryReducer = getFeedEntrySlice.reducer
export const updateFeedEntryReducer = updateFeedEntrySlice.reducer
