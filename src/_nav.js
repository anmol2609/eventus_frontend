import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilClone,
  cilLayers,
  cilCursor,
  cilTags,
  cilElevator,
  cilSitemap,
  cilFile,
  cilList,
  cilCode,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import customersIcon from './assets/images/customersIcon.svg'
import integrationsIcon from './assets/images/integrationsIcon.svg'
import onboardingIcon from './assets/images/onboardingIcon.svg'
import dataCenterIcon from './assets/images/dataCenterIcon.svg'
import sourcesIcon from './assets/images/sourcesIcon.svg'
import canvasIcon from './assets/images/canvasIcon.svg'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'SOAR Customers',
  //   to: '/soar_customers',
  //   icon: <CIcon icon={cilElevator} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'SOAR Products',
  //   to: '/soar_products',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'AWS Customer',
  //   to: '/aws_customers',
  //   icon: <CIcon icon={cibAmazonAws} customClassName="nav-icon" />,
  //   // badge: {
  //   //   color: 'info',
  //   //   text: 'NEW',
  //   // },
  // },
  // {
  //   component: CNavItem,
  //   name: 'V1 Customers',
  //   to: '/v1_customers',
  //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'O365 Customers',
  //   to: '/O365_customers',
  //   icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'V1 Products',
  //   to: '/v1_products',
  //   icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Customers',
  //   to: '/customers',
  //   icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Data Centers',
  //   to: '/data_centers',
  //   icon: <CIcon icon={cilClone} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'TI Sources',
  //   to: '/base',
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Management',
  //       to: '/rss_feeds',
  //       icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Threat Intelligence',
    to: '/base',
    items: [
      {
        component: CNavItem,
        name: 'TI Sources',
        to: '/rss_feeds',
        icon: <img src={sourcesIcon} className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'TI Canvas',
        to: '/feed_entry',
        icon: <img src={canvasIcon} className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Management',
    to: '/base',
    items: [
      {
        component: CNavItem,
        name: 'Customers',
        to: '/customers',
        icon: <img src={customersIcon} className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Integrations',
        to: '/integration',
        icon: <img src={integrationsIcon} className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Onboarding',
        to: '/onboarding',
        icon: <img src={onboardingIcon} className="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Data Centers',
      //   to: '/data_centers',
      //   icon: <img src={dataCenterIcon} className="nav-icon" />,
      // },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
