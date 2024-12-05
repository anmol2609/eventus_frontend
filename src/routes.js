import React from 'react'

const AWSCustomers = React.lazy(() => import('./views/aws_customer/AWSCustomer'))
const NewAWSCustomer = React.lazy(() => import('./views/aws_customer/NewAWSCustomer'))
const EditAWSCustomer = React.lazy(() => import('./views/aws_customer/EditAWSCustomer'))

const Customers = React.lazy(() => import('./views/customers/CustomersList'))
const NewCustomer = React.lazy(() => import('./views/customers/NewCustomer'))
const EditCustomer = React.lazy(() => import('./views/customers/EditCustomer'))

const O365Customers = React.lazy(() => import('./views/O365_customer/O365CustomerList'))
const NewO365Customer = React.lazy(() => import('./views/O365_customer/NewO365Customer'))
const EditO365Customer = React.lazy(() => import('./views/O365_customer/EditO365Customer'))

const SOARCustomers = React.lazy(() => import('./views/soar_customer/SOARCustomerList'))
const NewSOARCustomer = React.lazy(() => import('./views/soar_customer/NewSOARCustomer'))
const EditSOARCustomer = React.lazy(() => import('./views/soar_customer/EditSOARCustomer'))

const V1Customers = React.lazy(() => import('./views/v1_customer/V1CustomerList'))
const NewV1Customer = React.lazy(() => import('./views/v1_customer/NewV1Customer'))
const EditV1Customer = React.lazy(() => import('./views/v1_customer/EditV1Customer'))

const Onboarding = React.lazy(() => import('./views/onboarding/Onboarding'))
const Integration = React.lazy(() => import('./views/integration/Integration'))

const V1CustomerProducts = React.lazy(
  () => import('./views/v1_customer_product/V1CustomerProductList'),
)
const NewV1CustomerProduct = React.lazy(
  () => import('./views/v1_customer_product/NewV1CustomerProduct'),
)
const EditV1CustomerProduct = React.lazy(
  () => import('./views/v1_customer_product/EditV1CustomerProduct'),
)

const SOARProducts = React.lazy(() => import('./views/SOAR_product/SOARProductList'))
const NewSOARProduct = React.lazy(() => import('./views/SOAR_product/NewSOARProduct'))
const EditSOARProduct = React.lazy(() => import('./views/SOAR_product/EditSOARProduct'))

const V1Products = React.lazy(() => import('./views/V1_product/V1ProductList'))
const NewV1Product = React.lazy(() => import('./views/V1_product/NewV1Product'))
const EditV1Product = React.lazy(() => import('./views/V1_product/EditV1Product'))

const DataCenters = React.lazy(() => import('./views/data_centers/DataCenterList'))
const NewDataCenters = React.lazy(() => import('./views/data_centers/NewDataCenter'))
const EditDataCenters = React.lazy(() => import('./views/data_centers/EditDataCenter'))

const RssFeeds = React.lazy(() => import('./views/rss_feed/RssFeedList'))
const NewRssFeed = React.lazy(() => import('./views/rss_feed/NewRssFeed'))
const EditRssFeed = React.lazy(() => import('./views/rss_feed/EditRssFeed'))

const FeedEntries = React.lazy(() => import('./views/feed_entry/FeedEntryList'))
const NewFeedEntry = React.lazy(() => import('./views/feed_entry/NewFeedEntry'))
const EditFeedEntry = React.lazy(() => import('./views/feed_entry/EditFeedEntry'))
const ViewFeedEntry = React.lazy(() => import('./views/feed_entry/ViewFeedEntry'))
const ViewFeedEntryAndArtifacts = React.lazy(
  () => import('./views/feed_entry/ViewFeedEntryAndArtifacts'),
)

const Artifacts = React.lazy(() => import('./views/artifacts/ArtifactsList'))
const NewArtifact = React.lazy(() => import('./views/artifacts/NewArtifact'))
const EditArtifact = React.lazy(() => import('./views/artifacts/EditArtifacts'))

const NewUser = React.lazy(() => import('./views/user_management/NewUser'))
const EditUser = React.lazy(() => import('./views/user_management/EditUser'))


// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/aws_customers', name: 'AWS Customer', element: AWSCustomers },
  { path: '/aws_customers/new', name: 'AWS Customer', element: NewAWSCustomer },
  { path: '/aws_customers/:id/edit', name: 'AWS Customer', element: EditAWSCustomer },

  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/customers/new', name: 'New Customer', element: NewCustomer },
  { path: '/customers/:id/edit', name: 'Edit Customer', element: EditCustomer },

  { path: '/O365_customers', name: 'O365 Customers', element: O365Customers },
  { path: '/O365_customers/new', name: 'New O365 Customer', element: NewO365Customer },
  { path: '/O365_customers/:id/edit', name: 'Edit O365 Customer', element: EditO365Customer },

  { path: '/soar_customers', name: 'SOAR Customers', element: SOARCustomers },
  { path: '/soar_customers/new', name: 'New SOAR Customer', element: NewSOARCustomer },
  { path: '/soar_customers/:id/edit', name: 'Edit SOAR Customer', element: EditSOARCustomer },

  { path: '/soar_products', name: 'SOAR Products', element: SOARProducts },
  { path: '/soar_products/new', name: 'New SOAR Products', element: NewSOARProduct },
  { path: '/soar_products/:id/edit', name: 'Edit SOAR Product', element: EditSOARProduct },

  { path: '/onboarding', name: 'Onboarding', element: Onboarding },
  { path: '/integration', name: 'Integration', element: Integration },
  // { path: '/v1_customers/new', name: 'New V1 Customer', element: NewV1Customer },
  // { path: '/v1_customers/:id/edit', name: 'Edit V1 Customer', element: EditV1Customer },

  { path: '/v1_products', name: 'V1 Products', element: V1Products },
  { path: '/v1_products/new', name: 'New V1 Products', element: NewV1Product },
  { path: '/v1_products/:id/edit', name: 'Edit V1 Products', element: EditV1Product },

  {
    path: '/v1_customer_products/:customer_id',
    name: 'V1 Customer Products',
    element: V1CustomerProducts,
  },
  {
    path: '/v1_customer_products/:customer_id/new',
    name: 'New V1 Customer Product',
    element: NewV1CustomerProduct,
  },
  {
    path: '/v1_customer_products/:id/edit',
    name: 'Edit V1 Customer Product',
    element: EditV1CustomerProduct,
  },

  { path: '/data_centers', name: 'V1 Products', element: DataCenters },
  { path: '/data_centers/new', name: 'New V1 Products', element: NewDataCenters },
  { path: '/data_centers/:id/edit', name: 'Edit V1 Products', element: EditDataCenters },

  { path: '/rss_feeds', name: 'Rss Feeds', element: RssFeeds },
  { path: '/rss_feeds/new', name: 'New Rss Feed', element: NewRssFeed },
  { path: '/rss_feeds/:id/edit', name: 'Edit Rss Feed', element: EditRssFeed },

  { path: '/feed_entry', name: 'Feed Entries', element: FeedEntries },
  { path: '/feed_entry/new', name: 'New Feed Entry', element: NewFeedEntry },
  { path: '/feed_entry/:id/edit', name: 'Edit Feed Entry', element: EditFeedEntry },
  { path: '/feed_entry/:id/view', name: 'View Feed Entry', element: ViewFeedEntry },
  {
    path: '/feed_entry/:id/view_artifacts',
    name: 'View Feed Entry And Artifacts',
    element: ViewFeedEntryAndArtifacts,
  },

  { path: '/artifacts/:feed_id', name: 'Artifacts', element: Artifacts },
  { path: '/artifacts/:feed_id/new', name: 'New Artifact', element: NewArtifact },
  { path: '/artifacts/:id/edit', name: 'Edit Artifact', element: EditArtifact },

  { path: '/users/new', name: 'New Customer', element: NewUser },
  { path: '/users/:id/edit', name: 'Edit Customer', element: EditUser },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tabs', name: 'Tabs', element: Tabs },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
