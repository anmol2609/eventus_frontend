import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configured_rss_feed: {},
  rss_feed: null,
  rss_feeds: [],
  loading: false,
  success: false,
  isUpdated: false,
  is_configured: false,
  error: null,
};

const RssFeedSlice = createSlice({
  name: 'RssFeed',
  initialState,
  reducers: {
    // Configure RSS Feed
    configureRssFeedRequest: (state) => {
      state.loading = true;
    },
    configureRssFeedSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.is_configured = true;
      state.configured_rss_feed = action.payload;
    },
    configureRssFeedFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.is_configured = false;
      state.error = action.payload;
    },

    // Create RSS Feed
    createRssFeedRequest: (state) => {
      state.loading = true;
    },
    createRssFeedSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.rss_feed = action.payload;
    },
    createRssFeedFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get All RSS Feeds, filter, and search requests
    getAllRssFeedsRequest: (state) => {
      state.loading = true;
    },
    getAllRssFeedsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.rss_feeds = action.payload;
    },
    getAllRssFeedsFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Get a specific RSS Feed
    getRssFeedRequest: (state) => {
      state.loading = true;
    },
    getRssFeedSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.rss_feed = action.payload;
    },
    getRssFeedFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Update RSS Feed
    updateRssFeedRequest: (state) => {
      state.loading = true;
    },
    updateRssFeedSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.rss_feed = action.payload;
    },
    updateRssFeedFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = false;
      state.error = action.payload;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
      state.isUpdated = false;
      state.is_configured = false;
    },
  },
});

// Export actions and reducer
export const {
  configureRssFeedRequest,
  configureRssFeedSuccess,
  configureRssFeedFail,
  createRssFeedRequest,
  createRssFeedSuccess,
  createRssFeedFail,
  getAllRssFeedsRequest,
  getAllRssFeedsSuccess,
  getAllRssFeedsFail,
  getRssFeedRequest,
  getRssFeedSuccess,
  getRssFeedFail,
  updateRssFeedRequest,
  updateRssFeedSuccess,
  updateRssFeedFail,
  clearErrors,
} = RssFeedSlice.actions;

export const RssFeedReducer =  RssFeedSlice.reducer;
