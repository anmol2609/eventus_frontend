/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CButton
} from '@coreui/react'
import { toggleSidebar } from '../actions/ThemeActions'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

import closeSidebar from '../assets/images/closeSidebar.svg'
import openSidebar from '../assets/images/openSidebar.svg'
import { Colors } from '../utils/colors'
import { getUserDetailsBySessionId } from '../slices/userManagement/GetUserDetailsBySessionIdSlice'

const AppHeader = ({ name }) => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sideBarShow)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    document.cookie = `session_id=dbf24783-c760-419f-9199-9966a7d9f67e;Max-Age=86400;SameSite=None;Secure`
    let id = document.cookie.split('; ')[3].split('=')[1]
    dispatch(getUserDetailsBySessionId(id))
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-2 p-0" ref={headerRef} style={{ zIndex: '0' }}>
      <CContainer
        className="d-flex align-items-center justify-content-between border-bottom px-4"
        style={{
          backgroundColor: '#141414',
        }}
        fluid
      >
        {/* <CHeaderToggler
          onClick={() => {
            setSidebarOpen(!sidebarOpen)
            dispatch(toggleSidebar(!sidebarShow.sidebarShow))
          }}
          style={{
            marginLeft: sidebarOpen ? '-48.5px' : '-36px',
            marginBottom: '-58.5px',
          }}
        >
          <img
            src={sidebarOpen ? closeSidebar : openSidebar}
            style={{ width: '24px', height: '24px' }}
          />
        </CHeaderToggler> */}
        <div>
          <p style={{ fontSize: '14px', height: '30px', marginBottom: '0', paddingTop: '4px' }}>
            {name}
          </p>
        </div>
        <div>
          <a href='https://uatdashboard.eventussecurity.com'>Login</a>
        {/* <CButton
              size="sm"
              type="submit"
              variant="outline"
              className="mr-3 btn-configure"
              color="light"

              style={{
                padding: '4px 12px',
                borderRadius: 8,
                height: 36,
                backgroundColor: Colors.BLUE,
                borderColor: Colors.BLUE,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
              }}
            >
            Login
        </CButton> */}
        </div>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
