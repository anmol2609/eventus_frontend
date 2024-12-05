import { configureStore } from '@reduxjs/toolkit'

// Importing only the necessary reducers for customer and feed entry
import {
  createCustomerReducer,
  getAllCustomersReducer,
  getCustomerReducer,
  l0CustomerReducer,
  l1CustomerReducer,
  l2CustomerReducer,
  updateCustomerReducer,
} from './slices/customerSlice'
import {
  createFeedEntryReducer,
  getAllFeedEntriesReducer,
  getApprovedFeedEntriesReducer,
  getCompletedFeedEntriesReducer,
  getFeedEntryReducer,
  updateFeedEntryReducer,
} from './slices/feedEntrySlice'
import { rightSidebarReducer, sidebarReducer, themeReducer } from './slices/ThemeSlice'
import { createSOARCustomerReducer, getAllSOARCustomersReducer, getSOARCustomerReducer, updateSOARCustomerReducer } from './slices/soarCustomerSlice'
import soarProductReducer from './slices/soarProductSlice'; // make sure this path is correct
import { RssFeedReducer } from './slices/rssFeedSlice'
import { createArtifactReducer, getArtifactReducer, getArtifactsReducer, testArtifactsReducer, updateArtifactReducer } from './slices/Artifactslice'
import { mlModelReducer } from './slices/MIModelslice'
import { tagsReducer } from './slices/Tagsslice'
import { mitreReducer } from './slices/Mitreslice'
import { createDataCenterReducer, getAllDataCentersReducer, getDataCenterReducer, updateDataCenterReducer } from './slices/DataCenterslice'
import { awsCustomerCreateReducer, getAllAWSCustomersReducer, getAWSCustomerReducer, updateAWSCustomerReducer } from './slices/AWSCustomerslice'
import { O365CustomerSliceReducer } from './slices/O365Customerslice'


// Configure the store with only customer and feed entry reducers
export const store = configureStore({
  reducer: {
    // Customer
    create_customer: createCustomerReducer,
    customer: getCustomerReducer,
    customers: getAllCustomersReducer,
    update_customer: updateCustomerReducer,
    l0_customers: l0CustomerReducer,
    l1_customers: l1CustomerReducer,
    l2_customers: l2CustomerReducer,

    // Feed Entry
    create_feed_entry: createFeedEntryReducer,
    feed_entries: getAllFeedEntriesReducer,
    approved_feed_entries: getApprovedFeedEntriesReducer,
    completed_feed_entries: getCompletedFeedEntriesReducer,
    feed_entry: getFeedEntryReducer,
    update_feed_entry: updateFeedEntryReducer,

    theme: themeReducer,
    rightSidebarShow: rightSidebarReducer,
    sideBarShow: sidebarReducer,
    
    // SOAR Customer
    createSOARCustomer: createSOARCustomerReducer,
    allSOARCustomers: getAllSOARCustomersReducer,
    SOARCustomer: getSOARCustomerReducer,
    updateSOARCustomer: updateSOARCustomerReducer,
    
    // SOAR Product
    soarProducts: soarProductReducer,
    
    // RSS Feed
    create_rss_feed: RssFeedReducer,
    configured_rss_feed: RssFeedReducer,
    rss_feeds: RssFeedReducer,
    rss_feed: RssFeedReducer,
    update_rss_feed: RssFeedReducer,
    
    // Artifact
    create_artifact: createArtifactReducer,
    artifacts: getArtifactsReducer,
    artifact: getArtifactReducer,
    update_artifact: updateArtifactReducer,
    test_artifacts: testArtifactsReducer,
    
    // ML Model, Tags, and Mitre
    ml_model: mlModelReducer,
    all_tags: tagsReducer,
    all_mitre: mitreReducer,

    // Data Center
    create_data_center: createDataCenterReducer,
    data_centers: getAllDataCentersReducer,
    data_center: getDataCenterReducer,
    update_data_center: updateDataCenterReducer,

    // AWS Customer
    create_aws_customer: awsCustomerCreateReducer,
    aws_customer: getAWSCustomerReducer,
    update_aws_customer: updateAWSCustomerReducer,
    all_aws_customers: getAllAWSCustomersReducer,
    
    // O365 Customer
    create_O365_customer: O365CustomerSliceReducer,
    O365_customers: O365CustomerSliceReducer,
    O365_customer: O365CustomerSliceReducer,
    update_O365_customer: O365CustomerSliceReducer,

    //Theme
    theme: themeReducer,
    rightSidebarShow: rightSidebarReducer,
    sideBarShow: sidebarReducer,

    // Other slices can be commented out or removed
    /*


    // V1 Customer
    create_V1_customer: v1CustomerReducer,
    V1_customers: v1CustomerReducer,
    V1_customer: v1CustomerReducer,
    update_V1_customer: v1CustomerReducer,

    // V1 Customer Product
    create_V1_customer_product: v1CustomerProductReducer,
    V1_customer_products_for_customer: v1CustomerProductReducer,
    V1_customer_product: v1CustomerProductReducer,
    update_V1_customer_product: v1CustomerProductReducer,


    // V1 Product
    create_V1_product: v1ProductReducer,
    V1_products: v1ProductReducer,
    V1_product: v1ProductReducer,
    update_V1_product: v1ProductReducer,





    // Theme and Sidebar
    */
  },
})

export default store

// // import { legacy_createStore as createStore } from 'redux'

// // const initialState = {

// //   theme: 'light',
// // }

// // export default store

// import { applyMiddleware, createStore, combineReducers } from 'redux'
// import { thunk } from 'redux-thunk'
// import { RightSidebarReducer, SidebarReducer, ThemeReducer } from './reducers/ThemeReducer'
// import {
//   AWSCustomerCreateReducer,
//   getAWSCustomerReducer,
//   getAllAWSCustomersReducer,
//   updateAWSCustomerReducer,
// } from './reducers/AWSCustomerReducer'
// import {
//   GetAllCustomersReducer,
//   createCustomerReducer,
//   getCustomerReducer,
//   getL0CustomerReducer,
//   getL1CustomerReducer,
//   getL2CustomerReducer,
//   updateCustomerReducer,
// } from './reducers/CustomerReducer'
// import {
//   GetAllDataCentersReducer,
//   createDataCenterReducer,
//   getDataCenterReducer,
//   updateDataCenterReducer,
// } from './reducers/DataCenterReducer'
// import {
//   GetAllO365CustomersReducer,
//   createO365CustomerReducer,
//   getO365CustomerReducer,
//   updateO365CustomerReducer,
// } from './reducers/O365CustomerReducer'
// import {
//   GetAllSOARCustomersReducer,
//   createSOARCustomerReducer,
//   getSOARCustomerReducer,
//   updateSOARCustomerReducer,
// } from './reducers/SOARCustomerReducer'
// import {
//   GetAllV1CustomersReducer,
//   createV1CustomerReducer,
//   getV1CustomerReducer,
//   updateV1CustomerReducer,
// } from './reducers/V1CustomerReducer'
// import {
//   GetAllSOARProductsReducer,
//   createSOARProductReducer,
//   getSOARProductReducer,
//   updateSOARProductReducer,
// } from './reducers/SOARProductReducer'
// import {
//   GetAllV1ProductsReducer,
//   createV1ProductReducer,
//   getV1ProductReducer,
//   updateV1ProductReducer,
// } from './reducers/V1ProductReducer'
// import {
//   GetAllRssFeedsReducer,
//   createRssFeedReducer,
//   getRssFeedReducer,
//   updateRssFeedReducer,
//   configureRssFeedReducer,
// } from './reducers/RssFeedReducer'
// import {
//   GetAllFeedEntriesReducer,
//   GetApprovedFeedEntriesReducer,
//   GetCompletedFeedEntriesReducer,
//   createFeedEntryReducer,
//   getFeedEntryReducer,
//   updateFeedEntryReducer,
// } from './reducers/FeedEntryReducer'
// import {
//   GetV1CustomerProductForCustomerReducer,
//   createV1CustomerProductReducer,
//   getV1CustomerProductReducer,
//   updateV1CustomerProductReducer,
// } from './reducers/V1CustomerProductReducer'
// import {
//   GetArtifactsReducer,
//   createArtifactReducer,
//   getArtifactReducer,
//   testArtifactsReducer,
//   updateArtifactReducer,
// } from './reducers/ArtifactReducer'
// import { getMlModelReducer } from './reducers/MlModelReducer'
// import { GetTagsReducer } from './reducers/TagsReducer'
// import { GetMitreReducer } from './reducers/MitreReducer'

// const initialState = {
//   sidebarShow: true,
//   rightSidebarShow: false,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// // const combinedState = (state = {}, action) => {
// //   return {
// //     a: a(state.a, action),
// //     b: b(state.b, action),
// //   }
// // }

// const reducer = combineReducers({
//   create_aws_customer: AWSCustomerCreateReducer,
//   aws_customer: getAWSCustomerReducer,
//   update_aws_customer: updateAWSCustomerReducer,
//   all_aws_customers: getAllAWSCustomersReducer,

//   create_customer: createCustomerReducer,
//   customers: GetAllCustomersReducer,
//   customer: getCustomerReducer,
//   update_customer: updateCustomerReducer,
//   l0_customers: getL0CustomerReducer,
//   l1_customers: getL1CustomerReducer,
//   l2_customers: getL2CustomerReducer,

//   create_O365_customer: createO365CustomerReducer,
//   O365_customers: GetAllO365CustomersReducer,
//   O365_customer: getO365CustomerReducer,
//   update_O365_customer: updateO365CustomerReducer,

//   create_SOAR_customer: createSOARCustomerReducer,
//   SOAR_customers: GetAllSOARCustomersReducer,
//   SOAR_customer: getSOARCustomerReducer,
//   update_SOAR_customer: updateSOARCustomerReducer,

//   create_V1_customer: createV1CustomerReducer,
//   V1_customers: GetAllV1CustomersReducer,
//   V1_customer: getV1CustomerReducer,
//   update_V1_customer: updateV1CustomerReducer,

//   create_V1_customer_product: createV1CustomerProductReducer,
//   V1_customer_products_for_customer: GetV1CustomerProductForCustomerReducer,
//   V1_customer_product: getV1CustomerProductReducer,
//   update_V1_customer_product: updateV1CustomerProductReducer,

//   create_SOAR_product: createSOARProductReducer,
//   SOAR_products: GetAllSOARProductsReducer,
//   SOAR_product: getSOARProductReducer,
//   update_SOAR_product: updateSOARProductReducer,

//   create_V1_product: createV1ProductReducer,
//   V1_products: GetAllV1ProductsReducer,
//   V1_product: getV1ProductReducer,
//   update_V1_product: updateV1ProductReducer,

//   create_data_center: createDataCenterReducer,
//   data_centers: GetAllDataCentersReducer,
//   data_center: getDataCenterReducer,
//   update_data_center: updateDataCenterReducer,

//   create_rss_feed: createRssFeedReducer,
//   configured_rss_feed: configureRssFeedReducer,
//   rss_feeds: GetAllRssFeedsReducer,
//   rss_feed: getRssFeedReducer,
//   update_rss_feed: updateRssFeedReducer,

//   create_feed_entry: createFeedEntryReducer,
//   feed_entries: GetAllFeedEntriesReducer,
//   approved_feed_entries: GetApprovedFeedEntriesReducer,
//   completed_feed_entries: GetCompletedFeedEntriesReducer,
//   feed_entry: getFeedEntryReducer,
//   update_feed_entry: updateFeedEntryReducer,

//   create_artifact: createArtifactReducer,
//   artifacts: GetArtifactsReducer,
//   artifact: getArtifactReducer,
//   update_artifact: updateArtifactReducer,
//   test_artifacts: testArtifactsReducer,

//   ml_model: getMlModelReducer,
//   all_tags: GetTagsReducer,
//   all_mitre: GetMitreReducer,

//   theme: ThemeReducer,
//   rightSidebarShow: RightSidebarReducer,
//   sideBarShow: SidebarReducer,
// })

// const store = createStore(reducer, initialState, applyMiddleware(thunk))

// // const store = createStore(changeState)
// export default store
