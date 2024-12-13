import { configureStore } from '@reduxjs/toolkit'

// Importing only the necessary reducers for customer and feed entry
// import {
//   createCustomerReducer,
//   getAllCustomersReducer,
//   getCustomerReducer,
//   l0CustomerReducer,
//   l1CustomerReducer,
//   l2CustomerReducer,
//   updateCustomerReducer,
// } from './slices/customerSlice'
import {
  createFeedEntryReducer,
  getAllFeedEntriesReducer,
  getApprovedFeedEntriesReducer,
  getCompletedFeedEntriesReducer,
  getFeedEntryReducer,
  updateFeedEntryReducer,
} from './slices/feedEntrySlice'
import { rightSidebarReducer, sidebarReducer, themeReducer } from './slices/ThemeSlice'
//import { createSOARCustomerReducer, getAllSOARCustomersReducer, getSOARCustomerReducer, updateSOARCustomerReducer } from './slices/soarCustomerSlice'
import soarProductReducer from './slices/soarProductSlice'; // make sure this path is correct
import { RssFeedReducer } from './slices/rssFeedSlice'
//import { createArtifactReducer, getArtifactReducer, getArtifactsReducer, testArtifactsReducer, updateArtifactReducer } from './slices/Artifactslice'
import { mlModelReducer } from './slices/MIModelslice'
import { tagsReducer } from './slices/tags/Tagsslice'
import { mitreReducer } from './slices/Mitreslice'
//import { createDataCenterReducer, getAllDataCentersReducer, getDataCenterReducer, updateDataCenterReducer } from './slices/DataCenterslice'
//import { awsCustomerCreateReducer, getAllAWSCustomersReducer, getAWSCustomerReducer, updateAWSCustomerReducer } from './slices/AWSCustomerslice'
import { O365CustomerSliceReducer } from './slices/O365Customerslice'

import { userSliceReducer } from './slices/userSlice'
import { tenantsSliceReducer } from './slices/tenantsSlice'
import { dataCenterReducer } from './slices/DataCenterslice'
import { customerReducer } from './slices/customerSlice'

import { l0CustomersReducer } from './slices/l0CustomerSlice'
import { l1CustomersReducer } from './slices/l1CustomerSlice'
import { l2CustomersReducer } from './slices/l2CustomerSlice'
import { create_V1_customer, update_V1_customer, V1_customer, V1_customers, V1CustomerReducer } from './slices/V1Customerslice';
import { V1CustomerProductReducer } from './slices/V1CustomerProduct';
import { l3CustomersReducer } from './slices/l3CustomerSlice'

import { createAWSCustomerReducer } from './slices/awsCustomer/CreateAWSCustomerSlice'
import { getAWSCustomerReducer } from './slices/awsCustomer/GetAWSCustomerSlice'
import { getAllAWSCustomersReducer } from './slices/awsCustomer/GetAllAWSCustomersSlice'
import { updateAWSCustomerReducer } from './slices/awsCustomer/UpdateAWSCustomerSlice'

import { createArtifactReducer } from './slices/Artifact/CreateArtifactSlice'
import { getAllArtifactsReducer } from './slices/Artifact/GetAllArtifactsSlice'
import { getArtifactReducer } from './slices/Artifact/GetArtifactSlice'
import { testArtifactReducer } from './slices/Artifact/TestArtifactSlice'
import { updateArtifactReducer } from './slices/Artifact/UpdateArtifactSlice'

import { createV1CustomerReducer } from './slices/v1Customer/CreateV1Customerslice'
import { getAllV1CustomersReducer } from './slices/v1Customer/GetAllV1Customerslice'
import { getV1CustomerReducer } from './slices/v1Customer/GetV1Customerslice'
import { updateV1CustomerReducer } from './slices/v1Customer/UpdateV1Customerslice'

import { createV1CustomerProductReducer } from './slices/v1CustomerProduct/CreateV1CustomerProductSlice'
import { getAllV1CustomerProductsReducer } from './slices/v1CustomerProduct/GetAllV1CustomerProductSlice'
import { getV1CustomerProductReducer } from './slices/v1CustomerProduct/GetV1CustomerProductSlice'
import { updateV1CustomerProductReducer } from './slices/v1CustomerProduct/UpdateV1CustomerProductSlice'

import { getAllV1ProductsReducer } from './slices/v1Product/GetAllV1ProductSlice'
import { getV1ProductReducer } from './slices/v1Product/GetV1ProductSlice'
import { updateV1ProductReducer } from './slices/v1Product/UpdateV1ProductSlice'
import { createV1ProductReducer } from './slices/v1Product/CreateV1Product'

import { createSOARCustomerReducer } from './slices/SOARCustomer/CreateSOARCustomerSlice'
import {  getAllSOARCustomersReducer } from './slices/SOARCustomer/GetAllSOARCustomersSlice'
import {   getSOARCustomerReducer } from './slices/SOARCustomer/GetSOARCustomerSlice'
import {   updateSOARCustomerReducer } from './slices/SOARCustomer/UpdateSOARCustomerSlice'

import { createSOARProductReducer } from './slices/SOARProduct/CreateSOARProductSlice'
import {  getAllSOARProductsReducer } from './slices/SOARProduct/GetAllSOARProductsSlice'
import {   getSOARProductReducer } from './slices/SOARProduct/GetSOARProductSlice'
import {   updateSOARProductReducer } from './slices/SOARProduct/UpdateSOARProductSlice'


import { createLoggerCustomerReducer } from './slices/logger/CreateLoggerCustomerSlice'
import { createLoggerProductReducer  } from './slices/logger/CreateLoggerProductSlice'
import {  getAllLoggerCustomersReducer } from './slices/logger/GetAllLoggerCustomersSlice'
import {  getAllLoggerProductsReducer  } from './slices/logger/GetAllLoggerProductsSlice'
import { getLoggerCustomerReducer } from './slices/logger/GetLoggerCustomerSlice'
import {  getLoggerProductReducer } from './slices/logger/GetLoggerProductSlice'
import { updateLoggerCustomerReducer   } from './slices/logger/UpdateLoggerCustomerSlice'
import {  updateLoggerProductReducer  } from './slices/logger/UpdateLoggerProductSlice'

import { createUserByTenantReducer } from './slices/userManagement/CreateUserByTenantDataSlice'
import {  getUsersByTenantReducer } from './slices/userManagement/GetAllUsersByTenantSlice'
import {   getUserByTenantReducer } from './slices/userManagement/GetUserByTenantSlice'
import {   updateUserByTenantReducer } from './slices/userManagement/UpdateUserByTenantSlice'
import {   deleteUserByTenantReducer } from './slices/userManagement/DeleteUserBytenantSlice'

// Configure the store with only customer and feed entry reducers
export const store = configureStore({
  reducer: {
    // // Customer
    // create_customer: createCustomerReducer,
    // customer: getCustomerReducer,
    // customers: getAllCustomersReducer,
    // update_customer: updateCustomerReducer,
    // l0_customers: l0CustomerReducer,
    // l1_customers: l1CustomerReducer,
    // l2_customers: l2CustomerReducer,

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
    //createSOARCustomer: createSOARCustomerReducer,
    //allSOARCustomers: getAllSOARCustomersReducer,
    //SOARCustomer: getSOARCustomerReducer,
    //updateSOARCustomer: updateSOARCustomerReducer,
    
    create_SOAR_customer: createSOARCustomerReducer,
    SOAR_customers: getAllSOARCustomersReducer,
    SOAR_customer: getSOARCustomerReducer,
    update_SOAR_customer: updateSOARCustomerReducer,

    // SOAR Product
    create_SOAR_product: createSOARProductReducer,
    SOAR_products: getAllSOARProductsReducer,
    SOAR_product: getSOARProductReducer,
    update_SOAR_product: updateSOARProductReducer,

    // RSS Feed
    create_rss_feed: RssFeedReducer,
    configured_rss_feed: RssFeedReducer,
    rss_feeds: RssFeedReducer,
    rss_feed: RssFeedReducer,
    update_rss_feed: RssFeedReducer,

    // Artifact
    create_artifact: createArtifactReducer,
    artifacts: getAllArtifactsReducer,
    artifact: getArtifactReducer,
    update_artifact: updateArtifactReducer,
    test_artifacts: testArtifactReducer,
    
    // create_artifact: createArtifactReducer,
    // artifacts: getArtifactsReducer,
    // artifact: getArtifactReducer,
    // update_artifact: updateArtifactReducer,
    // test_artifacts: testArtifactsReducer,
    
    // ML Model, Tags, and Mitre
    ml_model: mlModelReducer,
    all_tags: tagsReducer,
    all_mitre: mitreReducer,

    // Data Center
    // create_data_center: createDataCenterReducer,
    // data_centers: getAllDataCentersReducer,
    // data_center: getDataCenterReducer,
    // update_data_center: updateDataCenterReducer,

    // AWS Customer
    create_aws_customer: createAWSCustomerReducer,
    aws_customer: getAWSCustomerReducer,
    update_aws_customer: updateAWSCustomerReducer,
    all_aws_customers: getAllAWSCustomersReducer,

    // O365 Customer
    create_O365_customer: O365CustomerSliceReducer,
    O365_customers: O365CustomerSliceReducer,
    O365_customer: O365CustomerSliceReducer,
    update_O365_customer: O365CustomerSliceReducer,

    user: userSliceReducer,
    tenants_by_tenancy_level: tenantsSliceReducer,
    data_center: dataCenterReducer,
    customer: customerReducer,
    l0_customers: l0CustomersReducer,
    l1_customers: l1CustomersReducer,
    l2_customers: l2CustomersReducer,
    l3_customers: l3CustomersReducer,

    // v1 customer
    create_V1_customer: createV1CustomerReducer,
    V1_customers: getAllV1CustomersReducer,
    V1_customer: getV1CustomerReducer,
    update_V1_customer: updateV1CustomerReducer,
    
     // v1 product
    create_V1_product: createV1ProductReducer,
    V1_products: getAllV1ProductsReducer,
    V1_product: getV1ProductReducer,
    update_V1_product: updateV1ProductReducer,

    // V1 Customer Product
    create_V1_customer_product: createV1CustomerProductReducer,
    V1_customer_products_for_customer: getAllV1CustomerProductsReducer,
    V1_customer_product: getV1CustomerProductReducer,
    update_V1_customer_product: updateV1CustomerProductReducer,
    
    // logger 
    create_logger_customer: createLoggerCustomerReducer,
    create_logger_product: createLoggerProductReducer,
    logger_customers: getAllLoggerCustomersReducer,
    logger_products: getAllLoggerProductsReducer,
    logger_customer: getLoggerCustomerReducer,
    logger_product: getLoggerProductReducer,
    update_logger_customer: updateLoggerCustomerReducer,
    update_logger_product: updateLoggerProductReducer,
    
    // User by tenant
    create_user_by_tenant: createUserByTenantReducer,
    users_by_tenant: getUsersByTenantReducer,
    user_by_tenant: getUserByTenantReducer,
    update_user_by_tenant: updateUserByTenantReducer,
    delete_user_by_tenant: deleteUserByTenantReducer,
    
    
    // Other slices can be commented out or removed
    /*


    // V1 Customer
    create_V1_customer: create_V1_customer,
    V1_customers: V1_customers,
    V1_customer: V1_customer,
    update_V1_customer: update_V1_customer,

    // V1 Customer Product
    create_V1_customer_product: V1CustomerProductReducer,
    V1_customer_products_for_customer: V1CustomerProductReducer,
    V1_customer_product: V1CustomerProductReducer,
    update_V1_customer_product: V1CustomerProductReducer,

    // V1 Product
    create_V1_product: v1ProductReducer,
    V1_products: v1ProductReducer,
    V1_product: v1ProductReducer,
    update_V1_product: v1ProductReducer,
    // Other slices can be commented out or removed
    /*







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
