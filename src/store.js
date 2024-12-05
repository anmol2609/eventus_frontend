// import { legacy_createStore as createStore } from 'redux'

// const initialState = {

//   theme: 'light',
// }

// export default store

import { applyMiddleware, createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { RightSidebarReducer, SidebarReducer, ThemeReducer } from './reducers/ThemeReducer'
import {
  AWSCustomerCreateReducer,
  getAWSCustomerReducer,
  getAllAWSCustomersReducer,
  updateAWSCustomerReducer,
} from './reducers/AWSCustomerReducer'
import {
  GetAllCustomersReducer,
  createCustomerReducer,
  getCustomerReducer,
  getL0CustomerReducer,
  getL1CustomerReducer,
  getL2CustomerReducer,
  getL3CustomerReducer,
  updateCustomerReducer,
} from './reducers/CustomerReducer'
import {
  GetAllDataCentersReducer,
  createDataCenterReducer,
  getDataCenterReducer,
  updateDataCenterReducer,
} from './reducers/DataCenterReducer'
import {
  GetAllO365CustomersReducer,
  createO365CustomerReducer,
  getO365CustomerReducer,
  updateO365CustomerReducer,
} from './reducers/O365CustomerReducer'
import {
  GetAllSOARCustomersReducer,
  createSOARCustomerReducer,
  getSOARCustomerReducer,
  updateSOARCustomerReducer,
} from './reducers/SOARCustomerReducer'
import {
  GetAllV1CustomersReducer,
  createV1CustomerReducer,
  getV1CustomerReducer,
  updateV1CustomerReducer,
} from './reducers/V1CustomerReducer'
import {
  GetAllSOARProductsReducer,
  createSOARProductReducer,
  getSOARProductReducer,
  updateSOARProductReducer,
} from './reducers/SOARProductReducer'
import {
  GetAllV1ProductsReducer,
  createV1ProductReducer,
  getV1ProductReducer,
  updateV1ProductReducer,
} from './reducers/V1ProductReducer'
import {
  GetAllRssFeedsReducer,
  createRssFeedReducer,
  getRssFeedReducer,
  updateRssFeedReducer,
  configureRssFeedReducer,
} from './reducers/RssFeedReducer'
import {
  GetAllFeedEntriesReducer,
  GetApprovedFeedEntriesReducer,
  GetCompletedFeedEntriesReducer,
  createFeedEntryReducer,
  getFeedEntryReducer,
  updateFeedEntryReducer,
} from './reducers/FeedEntryReducer'
import {
  GetAllV1CustomerProductsReducer,
  GetV1CustomerProductForCustomerReducer,
  createV1CustomerProductReducer,
  getV1CustomerProductReducer,
  updateV1CustomerProductReducer,
} from './reducers/V1CustomerProductReducer'
import {
  GetArtifactsReducer,
  createArtifactReducer,
  getArtifactReducer,
  testArtifactsReducer,
  updateArtifactReducer,
} from './reducers/ArtifactReducer'
import { getMlModelReducer, updateMlModelReducer } from './reducers/MlModelReducer'
import { GetTagsReducer } from './reducers/TagsReducer'
import { GetMitreReducer } from './reducers/MitreReducer'
import {
  GetAllLoggerCustomersReducer,
  GetAllLoggerProductsReducer,
  createLoggerCustomerReducer,
  createLoggerProductReducer,
  getLoggerCustomerReducer,
  getLoggerProductReducer,
  updateLoggerCustomerReducer,
  updateLoggerProductReducer,
} from './reducers/LoggerReducer'

import {
  GetAllUsersReducer,
  createUserReducer,
  getUserByTenantReducer,
  updateUserReducer,
  getTenantByTenancyLevelReducer,
  deleteUserReducer
} from './reducers/UserReducer'

const initialState = {
  sidebarShow: true,
  rightSidebarShow: false,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

// const combinedState = (state = {}, action) => {
//   return {
//     a: a(state.a, action),
//     b: b(state.b, action),
//   }
// }

const reducer = combineReducers({
  create_aws_customer: AWSCustomerCreateReducer,
  aws_customer: getAWSCustomerReducer,
  update_aws_customer: updateAWSCustomerReducer,
  all_aws_customers: getAllAWSCustomersReducer,

  create_customer: createCustomerReducer,
  customers: GetAllCustomersReducer,
  customer: getCustomerReducer,
  update_customer: updateCustomerReducer,
  l0_customers: getL0CustomerReducer,
  l1_customers: getL1CustomerReducer,
  l2_customers: getL2CustomerReducer,
  l3_customers: getL3CustomerReducer,

  create_O365_customer: createO365CustomerReducer,
  O365_customers: GetAllO365CustomersReducer,
  O365_customer: getO365CustomerReducer,
  update_O365_customer: updateO365CustomerReducer,

  create_SOAR_customer: createSOARCustomerReducer,
  SOAR_customers: GetAllSOARCustomersReducer,
  SOAR_customer: getSOARCustomerReducer,
  update_SOAR_customer: updateSOARCustomerReducer,

  create_V1_customer: createV1CustomerReducer,
  V1_customers: GetAllV1CustomersReducer,
  V1_customer: getV1CustomerReducer,
  update_V1_customer: updateV1CustomerReducer,

  create_V1_customer_product: createV1CustomerProductReducer,
  V1_customer_products_for_customer: GetV1CustomerProductForCustomerReducer,
  V1_customer_product: getV1CustomerProductReducer,
  update_V1_customer_product: updateV1CustomerProductReducer,
  all_V1_customer_products: GetAllV1CustomerProductsReducer,

  create_SOAR_product: createSOARProductReducer,
  SOAR_products: GetAllSOARProductsReducer,
  SOAR_product: getSOARProductReducer,
  update_SOAR_product: updateSOARProductReducer,

  create_V1_product: createV1ProductReducer,
  V1_products: GetAllV1ProductsReducer,
  V1_product: getV1ProductReducer,
  update_V1_product: updateV1ProductReducer,

  create_data_center: createDataCenterReducer,
  data_centers: GetAllDataCentersReducer,
  data_center: getDataCenterReducer,
  update_data_center: updateDataCenterReducer,

  create_rss_feed: createRssFeedReducer,
  configured_rss_feed: configureRssFeedReducer,
  rss_feeds: GetAllRssFeedsReducer,
  rss_feed: getRssFeedReducer,
  update_rss_feed: updateRssFeedReducer,

  create_feed_entry: createFeedEntryReducer,
  feed_entries: GetAllFeedEntriesReducer,
  approved_feed_entries: GetApprovedFeedEntriesReducer,
  completed_feed_entries: GetCompletedFeedEntriesReducer,
  feed_entry: getFeedEntryReducer,
  update_feed_entry: updateFeedEntryReducer,

  create_artifact: createArtifactReducer,
  artifacts: GetArtifactsReducer,
  artifact: getArtifactReducer,
  update_artifact: updateArtifactReducer,
  test_artifacts: testArtifactsReducer,

  create_logger_product: createLoggerProductReducer,
  logger_products: GetAllLoggerProductsReducer,
  logger_product: getLoggerProductReducer,
  update_logger_product: updateLoggerProductReducer,

  create_logger_customer: createLoggerCustomerReducer,
  logger_customers: GetAllLoggerCustomersReducer,
  logger_customer: getLoggerCustomerReducer,
  update_logger_customer: updateLoggerCustomerReducer,

  ml_model: getMlModelReducer,
  update_ml_model: updateMlModelReducer,

  all_tags: GetTagsReducer,
  all_mitre: GetMitreReducer,

  theme: ThemeReducer,
  rightSidebarShow: RightSidebarReducer,
  sideBarShow: SidebarReducer,

  create_user: createUserReducer,
  userList: GetAllUsersReducer,
  user_by_tenant: getUserByTenantReducer,
  update_user: updateUserReducer,
  tenant_by_tenancy_level: getTenantByTenancyLevelReducer,
  deleteUserReducer:deleteUserReducer
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

// const store = createStore(changeState)
export default store
