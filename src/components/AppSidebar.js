import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import eventus from '../assets/brand/logo.png'
import { useNavigate } from 'react-router-dom'
import { AppSidebarNav } from './AppSidebarNav'
// import { sygnet } from 'src/assets/brand/logo.png'
import logoutIcon from '../assets/images/logout.svg'
import sidebarProfile from '../assets/images/sidebarProfile.svg'
import { Colors } from '../utils/colors'

// sidebar nav config
import navigation from '../_nav'
import { toggleSidebar } from '../actions/ThemeActions'
import './index.css'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const {user_detail} = useSelector((state) => state.user_details)
  console.log(user_detail,"sidebar")
  const sidebarShow = useSelector((state) => state.sideBarShow)

  return (
    <CSidebar
      className="border-end"
      // colorScheme="dark"
      style={{
        backgroundColor: '#242424',
        zIndex: '0',
      }}
      position="fixed"
      unfoldable={unfoldable}
      visible={!sidebarShow.sidebarShow}
      // onVisibleChange={() => {
      //   dispatch(toggleSidebar(!sidebarShow.sidebarShow))
      // }}
    >
      <CSidebarHeader
        className="d-flex align-items-center sidebar-custom-header"
        style={{ marginLeft: '7px' }}
      >
        <CSidebarBrand
          to="/"
          style={{
            textDecoration: 'none',
            // display: 'flex',
            // alignItems: 'center',
          }}
        >
          <img
            src={eventus}
            style={{ height: '55px', width: '200px', cursor: 'pointer', marginBottom: '-27px' }}
            alt="logo"
            onClick={() => navigate('/rss_feeds')}
          />
          {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} /> */}
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={eventus} height={32} /> */}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(toggleSidebar(!sidebarShow.sidebarShow))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter
        className="d-flex align-items-center my-4"
        style={{ width: '200px', height: '40px', margin: '0' }}
      >
        <img src={sidebarProfile} />
        <div className="d-flex flex-column flex-grow-1" style={{ margin: '0 51px 0 12px' }}>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '20px', color: Colors.WHITE }}>
            Username
          </p>
          <p style={{ margin: '0', fontSize: '12px', lineHeight: '16px', color: Colors.GRAY }}>
            userType
          </p>
        </div>
        <img
          className="clickable"
          src={logoutIcon}
          style={{ width: '24px', height: '24px' }}
          onClick={() => {}}
          alt="Logout"
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
